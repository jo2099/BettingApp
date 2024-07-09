import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Presentation from "../pages/Presentation";
const AuthRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Presentation/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Login/>} />
            <Route path="/*" element={<Presentation/>} />
        </Routes>
    );
}

export default AuthRoutes;