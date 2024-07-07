import styled,{css, keyframes} from "styled-components";

const CardTransition = keyframes`
    
    from {
        opacity: 0;
        transform: translateY(+20px);
    }
    to {
        opacity: 1;
        transform: translateY(0px);
    }
`;

const Hidden= css`
    opacity: 0;
    visibility: hidden;
    transform: scale(0.5);
    transition: opacity .5s, transform .5s, visibility .5s;
`;

const Visible= css`
    opacity: 1;
    visibility: visible;
    transform: scale(1);
    transition: opacity .5s, transform .5s, visibility .5s;
`;

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    color: #000;
    border-radius: 5%;
    width: 300px;
    height: 350px;
    flex-direction: column;
    animation: ${CardTransition} 0.5s ease-in-out;
    &:hover {
        transform: translateY(-5px) scale(1.05);
        transition: transform 0.5s;
        

    }
    &.hidden {
        ${Hidden}
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
    margin-top: 10%;

    & > * {
        padding-top: 2px;
    }

    label {
        font-size: 1.5vmin;
    }
`;

export const CardButtons = styled.div`
    display: flex;
    justify-content: flex-end  ;
    align-items: center;
    background-color: transparent;
    width: 100%;
    height: 40%;
    color: #000;
    flex-direction: column;

    div{
        display: flex;
        width: 100%;
        height: 45%;
        justify-content: space-around;
        align-items: flex-end;
        margin-top: 2px;

    }

    button{
        &:active {
            transform: scale(0.9);
        }
    }

    & #confirm {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 35%;

        button {
            &:hover {
                background-color: green;
                color: #fff;
            }
        }            
        &.visible {
            ${Visible}
        }
    }

    .hidden {
        ${Hidden}
    }



   div button {
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #F51414;
        color: #000;
        border-radius: 19px;
        width: 30%;
        height: 60%;

        &:hover {
            background-color: #000;
            color: #F51414;
        }

    }
`;

export const StyledInput = styled.input`
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #3014c3;
    color: #fff;
    border-radius: 19px;
    width: 30%;
    height: 60%;
    padding-left: 5%;

    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`;