import React,{createContext,useState,useContext} from "react";

interface IUserContext {
    username: string;
    coins: number;
    setCoins: React.Dispatch<React.SetStateAction<number>>;
} //isso é uma interface que define o que o contexto deve ter

interface IUserContextProvider {
    children: React.ReactNode;
} //isso é uma interface que define o que o provider deve ter

const UserContext = createContext<IUserContext>({} as IUserContext); //cria o contexto

const UserProvider: React.FC<IUserContextProvider> = ({children}) => {
    const [username,setUsername] = useState<string>(() => {
        const username = localStorage.getItem('@bet:username');
        return username || '';
    });

    const [coins,setCoins] = useState<number>(() => {
        const coins = localStorage.getItem('@bet:coins');
        return Number(coins) || 0;
    });

    return (
        <UserContext.Provider value={{username,coins,setCoins}}>
            {children}
        </UserContext.Provider>
    );
} //cria o provider

const useUserData = () => {
    const context = useContext(UserContext);
    return context;
} //cria um hook para usar o contexto

export {UserProvider,useUserData}; //exporta o provider e o hook