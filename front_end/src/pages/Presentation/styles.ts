import styled,{keyframes} from "styled-components";

const FadeIn = keyframes`
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
`;


export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    gap:5%;

    h1 {
        font-weight: 700;
        color: #fff;
        text-align: left;
        font-family: monospace;
        margin-bottom: 20px;
    }
    div{
        width: 50%;
        height: 50%;
        color: #fff;
    }

    img {
        width: 500px;
        height: 600px;
        border-radius: 15px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        animation: ${FadeIn} 1s;
        
    }

    p{
        font-size: 1.7rem;
        font-weight: 500;
        color: #fff;
        text-align: left;
        font-family: 'Roboto', sans-serif;
    }
    
`;

export const TextContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60%;
    margin-right: 10%;
    border-radius: 15px;
    background-color: #3140c3;
    color: #fff;
    h1 {
        font-weight: 700;
        color: #fff;
        text-align: center;
        font-family: 'Roboto', sans-serif;
    }
    p {
        font-size: 1.5rem;
        font-weight: 500;
        color: #fff;
        text-align: center;
        font-family: 'Roboto', sans-serif;
    }
`;
