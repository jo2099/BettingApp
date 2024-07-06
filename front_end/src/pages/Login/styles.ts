import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
<<<<<<< HEAD
    background-color: #f5f5f5;
=======
    width: 100%; 
`;

export const LoginForm = styled.form`
    width: 350px;
    padding: 25px;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center; 
`;

export const Title = styled.h1`
    font: normal;
    font-size: 6vh;
    margin-bottom: 50px; /* Espaçamento inferior */
`;

export const FormField = styled.div`
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    margin-bottom: 5px;
`;

export const Input = styled.input`
    padding: 10px;
    width: calc(100% - 20px); /* Subtrai o padding dos lados */
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 16px;
`;

export const Button = styled.button`
    font: normal;
    padding: 10px 20px;
    background-color: black;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
>>>>>>> master
`;