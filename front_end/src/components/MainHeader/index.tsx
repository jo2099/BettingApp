import React from "react";
import { Container,AuthButtonsdiv,EnterButton,RegisterButton,UserDiv } from "./styles";
import { UserIcon } from "../userIcon";
import CoinMeter from "../CoinMeter";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
export const MainHeader: React.FC = () => {
    const {logged} = useAuth();

    const navigate = useNavigate();
    
    return (
        <Container>
            {logged ?
            <UserDiv>
                <CoinMeter/> 
                <UserIcon/>
            </UserDiv> :
            <AuthButtonsdiv>
                <RegisterButton onClick={()=>navigate('/register')}>Cadastrar</RegisterButton>
                <EnterButton onClick={()=>navigate('/login')}>Entrar</EnterButton>
            </AuthButtonsdiv>}
        </Container>
    )
}