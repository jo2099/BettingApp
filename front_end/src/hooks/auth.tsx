import { resolve } from "path";
import React,{createContext,useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import {authLogin,authRegister} from "../api/index";

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
        authLogin(email,password).then((data) => {
            console.log("data",data);
            if(data.status=="success"){
                localStorage.setItem('@bet:logged','true');
                setLogged(true);
            }else{
                if(data.message=='Invalid username or password'){
                    alert('Usuário ou senha inválidos');
                }
                else{
                    alert('Erro ao logar');
                }
            }
        }).catch((data) => {
            alert('Erro ao logar');
            console.log(data);
        });
    }

    const signOut = () => {
        localStorage.removeItem('@bet:logged');
        setLogged(false);
    }

    const register = (email: string, password: string) => {
        //manda a requisição para o backend aqui ...
        authRegister(email,password).then((data) => {
            console.log("data",data);
            if(data.status=="success"){
                alert('Registrado com sucesso');
            }else{
                if(data.message=="Username already exists"){
                    alert('Usuário já existe');
                }else{
                    alert('Erro ao registrar');
                }
            }
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