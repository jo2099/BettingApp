import React, { createContext, useState, useContext,useEffect } from "react";
import { setCoins as setCoinsAPI ,getCoins} from "../api";
import useSSE from "./SSE";
interface IUserContext {
    username: string;
    coins: number;
    setCoins: (coins: number) => void; // Adiciona a função para atualizar as moedas
}

interface IUserContextProvider {
    children: React.ReactNode;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

const UserProvider: React.FC<IUserContextProvider> = ({ children}) => {
    const [coins, setCoins] = useState<number>(0); // Usa o estado para armazenar as moedas
    const logged= localStorage.getItem("@bet:logged");
    const id= localStorage.getItem("@id");
    useEffect(() => {
        if (!id) return;

        const eventSource = new EventSource('http://localhost:5000/user/userStream');
        
        eventSource.onmessage = (event) => { 
            console.log("USER message", event);
            const data = JSON.parse(event.data);
            if (data.event === "coins" && data.user_id == id) {
                getCoins(id).then((data) => {
                    setCoins(data.coins);
                });
            }
        };

        eventSource.onerror = (error) => {
            console.error('EventSource error:', error);
            eventSource.close();
        };

        // Função de limpeza
        return () => {
            console.log("Closing EventSource");
            eventSource.close();
        };
    }, [id]);







    return (
        <UserContext.Provider value={{ username:"", coins, setCoins }}>
            {children}
        </UserContext.Provider>
    );
};

function useUserData() {
    const context = useContext(UserContext);
    return context;
}

export {useUserData, UserProvider}; // Exporta a função useUserData e o componente UserProvider