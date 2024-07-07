import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 70%;
    color: #fff;
    gap: 10px;
    padding-top: 20px;

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        background-color: transparent;
        color: #fff;
        border-radius: 10px;
        width: 8%;
        height: 30px;

        &:hover {
            background-color: #282236;
            color: #F51414;
        }

        &:active {
            background-color: #F51414;
            color: #fff;
            transform: scale(0.9);
            /* transition: transform 0.5s; */
        }
    }
`;