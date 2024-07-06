import React from "react";
import AuthRoutes from "./auth.routes";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import Home from "../pages/Home";

const Routes: React.FC = () => {
    const {logged} = useAuth();

    const {signIn} = useAuth(); //isso depois será removido

    //faz o login de forma automática para testar a aplicação
    signIn('emailteste','senhateste');

    return (
        <BrowserRouter>
            {logged ? <Home/> : <AuthRoutes/>}
        </BrowserRouter>
    );
}

export default Routes;