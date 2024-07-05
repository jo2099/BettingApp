import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    color: #000;
    border-radius: 5%;
    width: 250px;
    height: 300px;
    flex-direction: column;

    &:hover {
        transform: translateY(-5px);
        transition: 0.5s;

    }
`;

export const CardHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: transparent;
    color: #000;
    width: 100%;
    height: 40%;
    flex-direction: column;
    overflow: hidden;

    & > * {
        padding-top: 2px;
    }

    label {
        font-size: 1.5vmin;
    }
`;

export const CardButtons = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: transparent;
    width: 90%;
    height: 40%;
    color: #000;
    width: 100%;
    height: 20%;
    flex-direction: row;

    button {
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #F51414;
        color: #000;
        border-radius: 19px;
        width: 30%;
        height: 30px;

        &:hover {
            background-color: #000;
            color: #F51414;
        }
    }
`;