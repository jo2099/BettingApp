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

export const getGameData = async (gameid: string) => {
    const response = await fetch('http://localhost:5000/game/'+gameid, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

export const sendBet = async (gameid: string, user_id:string, betvalue:any) => {
    const response = await fetch('http://localhost:5000/bet/createbet',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({game_id:gameid,user_id:user_id,bet_value:betvalue}),
    });
} 


export const getBets = async (userid: string) => {
    const response = await fetch('http://localhost:5000/bet/bets/'+userid, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

export const getRewards = async (userid:string) => {
    const response = await fetch('http://localhost:5000/reward/rewards/'+userid, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

export const getTeams = async () => {
    const response = await fetch('http://localhost:5000/user/users/teams', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}