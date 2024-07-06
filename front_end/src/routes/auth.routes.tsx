import React from "react";
import { Route, Routes } from "react-router-dom";

const AuthRoutes: React.FC = () => {
    return (
        <Routes>
        <Route path="/" element={<h1>AuthRoutes</h1>} />
        <Route path="/*" element={<h1>AuthRoutes</h1>} />
        </Routes>
    );
}

export default AuthRoutes;