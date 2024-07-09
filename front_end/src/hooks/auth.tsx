import { resolve } from "path";
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
        $.ajax({
            url: 'http://localhost:5000/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({username: email, password: password}),
            success: function(data){
                console.log(data);
            },
            error: function(data){
                alert('Erro ao logar');
                console.log(data);
            }
        });
        localStorage.setItem('@bet:logged','true');
        setLogged(true);
    }

    const signOut = () => {
        localStorage.removeItem('@bet:logged');
        setLogged(false);
    }

    const register = (email: string, password: string) => {
        //manda a requisição para o backend aqui ...
        const request = new Promise((resolve, reject) => {
            $.ajax({
                url: 'http://localhost:5000/register',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ username: email, password: password, atribute: 1 }),
                success: function (data) {
                    resolve(data);
                },
                error: function (data) {
                    reject(data);
                }
            });
        });

        request.then((data) => {
           alert('Registrado com sucesso');
           

        }).catch((data) => {
            alert('Erro ao registrar');
            console.log(data);
        });
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