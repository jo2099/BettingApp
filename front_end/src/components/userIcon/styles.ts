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
    color: #fff;
    align-items: flex-start; 
    margin-right: 45px;
    position:relative;
`;

export const UserMenu = styled.div`
    display: flex;
    background-color: #fff;
    position: absolute;
    top: 100%;
    left: -70px;
    width: 6vw;
    height: fit-content;
    padding-bottom: 30px;
    padding-top: 30px;
    border-radius: 5px;
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

export const MenuButton = styled.button`
    background-color: #3140C3;
    color: #fff;
    border: none;
    width: 70px;
    height: 25px;
    border-radius: 5px;
    font-weight: bold;
    &:hover {
        background-color: #F51414;
    }
`;
