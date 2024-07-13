import React from "react";

export const authLogin = async (email: string, password: string) => {
    const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, senha: password }),
    });
    return response.json();
}

export const authRegister = async (username:string,email: string, password: string) => {
    const response = await fetch('http://localhost:5000/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: username,email:email, senha: password}),
    });
    // let responsejson = await response.json(); 
    return response;
}

