import React from "react";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import Home from "../pages/Home";
import Layout from "../components/layout";
const Routes: React.FC = () => {
    const {logged} = useAuth();

    return (
        <BrowserRouter>
            <Layout>
            {logged ? <AppRoutes/> : <AuthRoutes/>}
            </Layout>
        </BrowserRouter>

    );
}

export default Routes;