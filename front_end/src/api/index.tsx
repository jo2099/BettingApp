import React from "react";

export const authLogin = async (email: string, password: string) => {
    const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password: password }),
    });
    return response.json();
}

export const authRegister = async (email: string, password: string) => {
    const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password: password, atribute: 1 }),
    });
    console.log(response)
    return response.json();
}

