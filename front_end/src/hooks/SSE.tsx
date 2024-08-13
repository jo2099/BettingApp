import React, { createContext, useState, useCallback, useEffect } from 'react';

// Definição do tipo para o contexto
interface SSEContextProps {
  eventSource: EventSource | null;
  startSSE: () => void;
  addCallbackSSE: (callback: (data: any) => void) => void;
  removeCallbackSSE: (callback: (data: any) => void) => void;
  addCallbackEventSSE: (idEvent: string,callback: (data: any) => void) => void;
  removeCallbackEventSSE: (idEvent: string,callback: (data: any) => void) => void;
}

// Criação do contexto com valores iniciais
export const SSEContext = createContext<SSEContextProps>({
  eventSource: null,
  startSSE: () => {},
  addCallbackSSE: () => {},
  removeCallbackSSE: () => {},
  addCallbackEventSSE: () => {},
  removeCallbackEventSSE: () => {},
});

// Provider para o contexto
export const SSEProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [gameEventSource, setGameEventSource] = useState<EventSource | null>(null);
  const [callbacks, setCallbacks] = useState<((data: any) => void)[]>([]);
  const [eventCallbacks,setEventCallbacks] = useState<{ [key: string]: ((data: any) => void)[] }>({});
  const callbacksRef = React.useRef<((data: any) => void)[]>([]);
  const eventCallbacksRef = React.useRef<{ [key: string]: ((data: any) => void)[] }>({});

  // Função para iniciar a conexão SSE
  const startSSE = useCallback(() => {
    if (!eventSource) {
      const es = new EventSource('http://localhost:5000/game/gameStream');
      setEventSource(es);

      es.onmessage = (event) => {
        // console.log('Received message:', event.data);
        // console.log("Event",event);
        //executar todos os callbacks
        callbacksRef.current.forEach((cb) => cb(event.data));
        // Aqui você pode notificar os assinantes ou atualizar o estado global
      };

      es.onerror = (error) => {
        console.error('EventSource error:', error);
        es.close();
        setEventSource(null); // Limpar o estado para permitir reconexão
      };
    }

    if (!gameEventSource) {
      const ges = new EventSource('http://localhost:5000/game/events/stream');
      // console.log("definiu o gameEventSource",ges);
      setGameEventSource(ges);

      ges.onmessage = (event) => {
        // console.log('Received message Event:', event.data);
        const obj = JSON.parse(event.data);
        const idEvent = obj.details.id;
        //executar todos os callbacks do id correspondente
        if(eventCallbacksRef.current[idEvent]){
        eventCallbacksRef.current[idEvent].forEach((cb) => cb(event.data));
        }
      }
    }
  }, [eventSource]);

  const addCallbackSSE = useCallback((callback: (data: any) => void) => {
    setCallbacks((prev) => [...prev, callback]);
    console.log("Callback adicionado",callback);
    callbacksRef.current.push(callback);
  }, []);

  const removeCallbackSSE = useCallback((callback: (data: any) => void) => {
    setCallbacks((prev) => prev.filter((cb) => cb !== callback));
    callbacksRef.current = callbacksRef.current.filter((cb) => cb !== callback);
  }, []);


  const addCallbackEventSSE = useCallback((idEvent: string,callback: (data: any) => void) => {
    if(!eventCallbacksRef.current[idEvent]){
      eventCallbacksRef.current[idEvent] = [];
    }
    setEventCallbacks((prev) => {
      if(!prev[idEvent]){
        prev[idEvent] = [];
      }
      return prev;
    });
    eventCallbacksRef.current[idEvent].push(callback);
  }
  , []);

  const removeCallbackEventSSE = useCallback((idEvent: string,callback: (data: any) => void) => {
    setEventCallbacks((prev) => {
      prev[idEvent] = prev[idEvent].filter((cb) => cb !== callback);
      return prev;
    });
    eventCallbacksRef.current[idEvent] = eventCallbacksRef.current[idEvent].filter((cb) => cb !== callback);
  }, []);

  // Limpar a conexão quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);



  return (
    <SSEContext.Provider value={{ eventSource, startSSE, addCallbackSSE,removeCallbackSSE,addCallbackEventSSE,removeCallbackEventSSE }}>
      {children}
    </SSEContext.Provider>
  );
};

function useSSE() {
  const context = React.useContext(SSEContext);

  if (!context) {
    throw new Error('useSSE must be used within a SSEProvider');
  }

  return context;
}

export default useSSE;

