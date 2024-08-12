import React, { createContext, useState, useCallback, useEffect } from 'react';

// Definição do tipo para o contexto
interface SSEContextProps {
  eventSource: EventSource | null;
  startSSE: () => void;
  addCallbackSSE: (callback: (data: any) => void) => void;
  removeCallbackSSE: (callback: (data: any) => void) => void;
}

// Criação do contexto com valores iniciais
export const SSEContext = createContext<SSEContextProps>({
  eventSource: null,
  startSSE: () => {},
  addCallbackSSE: () => {},
  removeCallbackSSE: () => {},
});

// Provider para o contexto
export const SSEProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [callbacks, setCallbacks] = useState<((data: any) => void)[]>([]);
  const callbacksRef = React.useRef<((data: any) => void)[]>([]);

  // Função para iniciar a conexão SSE
  const startSSE = useCallback(() => {
    if (!eventSource) {
      const es = new EventSource('http://localhost:5000/game/gameStream');
      setEventSource(es);

      es.onmessage = (event) => {
        console.log('Received message:', event.data);
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

  // Limpar a conexão quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);



  return (
    <SSEContext.Provider value={{ eventSource, startSSE, addCallbackSSE,removeCallbackSSE }}>
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

