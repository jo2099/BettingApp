import React,{createContext,useState,useContext} from "react";
import { useNavigate } from "react-router-dom";

interface IAuthContext {
    logged: boolean;
    signIn(email:string,password:string):void;
    signOut():void;
    register(email:string,password:string):void;
} //isso é uma interface que define o que o contexto deve ter

interface IAuthContextProvider {
    children: React.ReactNode;
} //isso é uma interface que define o que o provider deve ter

const AuthContext = createContext<IAuthContext>({} as IAuthContext); //cria o contexto


const AuthProvider: React.FC<IAuthContextProvider> = ({children}) => {
    const [logged,setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@bet:logged');
        return !!isLogged;
    });

    const signIn = (email:string,password:string) => {
        //manda a requisição para o backend aqui ...

        localStorage.setItem('@bet:logged','true');
        setLogged(true);
    }

    const signOut = () => {
        localStorage.removeItem('@bet:logged');
        setLogged(false);
    }

    const register = (email:string,password:string) => {
        //manda a requisição para o backend aqui ...

        //considerando que o server autorizou o registro
        //avisar o usuário que o registro foi bem sucedido
        alert("Registro bem sucedido");
        signIn(email,password);
    }


    return (
        <AuthContext.Provider value={{logged,signIn,signOut,register}}>
            {children}
        </AuthContext.Provider>
    );
} //cria o provider


function useAuth(): IAuthContext {
    const context = useContext(AuthContext);

    return context;
} //cria o hook

export {AuthProvider,useAuth}; //exporta o provider e o hook