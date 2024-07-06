import React from "react";
import { Container,AuthButtonsdiv,EnterButton,RegisterButton } from "./styles";
import { UserIcon } from "../userIcon";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
export const MainHeader: React.FC = () => {
    const {logged} = useAuth();

    const navigate = useNavigate();
    
    return (
        <Container>
            {logged ? <UserIcon/> :
            <AuthButtonsdiv>
                <RegisterButton>Cadastrar</RegisterButton>
                <EnterButton onClick={()=>navigate('/login')}>Entrar</EnterButton>
            </AuthButtonsdiv>}
        </Container>
    )
}