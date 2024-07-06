import styled from "styled-components";

export const Container = styled.div`
    font-size: 2vmin;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    grid-area: header;
    background-color: #F51414;
    color: #fff;
    `;


export const AuthButtonsdiv = styled.div`
    display: flex;
    align-items: center;
    gap: 2vmin;
    justify-content: space-between;
    margin-right: 2vmin;

    button {
        &:hover {
            background-color: #fff;
            color: #000;
        }
    }
    `;


export const EnterButton = styled.button`
    background-color: #3140C3;
    color: #fff;
    border: none;
    width: 10vmin;
    height: 4vmin;
    font-weight: bold;
    padding: 1vmin;
    font-size: 1.5vmin;
    border-radius: 5px;
    cursor: pointer;
    `;

export const RegisterButton = styled.button`
    background-color: transparent;
    color: #fff;
    font-weight: bold;
    border: solid 2px #fff;
    padding: 1vmin;
    width: 10vmin;
    height: 4vmin;
    font-size: 1.5vmin;
    border-radius: 5px;
    cursor: pointer;
    `;