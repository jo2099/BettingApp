import { resolve } from "path";
import React,{createContext,useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import {authLogin,authRegister} from "../api/index";

interface IAuthContext {
    logged: boolean;
    signIn(email:string,password:string):void;
    signOut():void;
    register(email:string,password:string):Promise<boolean>;
    getToken():string;
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
                localStorage.setItem('@bet:token',data.token);
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

    const getToken = () => {
        return localStorage.getItem('@bet:token') || '';
    }

    const register = async (email: string, password: string) => {
        try {
            const data = await authRegister(email,email, password);
            console.log("data", data);
            if (data.status == 200) {
                alert('Registrado com sucesso');
                return true;
            } else {
                if (data.status == 200) {
                    alert('Usuário já existe');
                    return false;
                } else {
                    alert('Erro ao registrar');
                    return false;
                }
            }
        } catch (error) {
            alert('Erro ao registrar');
            console.log(error);
            return false;
        }
        
    }


    return (
        <AuthContext.Provider value={{logged,signIn,signOut,register,getToken}}>
            {children}
        </AuthContext.Provider>
    );
} //cria o provider


function useAuth(): IAuthContext {
    const context = useContext(AuthContext);

    return context;
} //cria o hook

export {AuthProvider,useAuth}; //exporta o provider e o hook