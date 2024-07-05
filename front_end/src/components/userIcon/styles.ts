import styled,{keyframes} from "styled-components";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;


export const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    background-color: #F51414;
    /* background-color: blueviolet; */
    color: #fff;
    align-items: flex-start; /* Garante que o container se ajuste verticalmente ao conteúdo */
    width: fit-content;
    margin-right: 30px;
    position:relative;
`;

export const UserMenu = styled.div`
    display: flex;
    background-color: #fff;
    position: absolute;
    top: 100%;
    left: -75%;
    width: 100px;
    height: 80px;
    border-radius: 10px;
    color: #000;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    animation: ${fadeIn} 0.2s ease-out forwards;
    
`;

export const UserButton = styled.button`
    background-color: transparent;
    &:hover img{
        transform: scale(1.1);
        transition: transform 0.2s;
    }
`;
