import React, { useState,useCallback } from "react";
import { Container, LoginForm, Title, FormField, Label, Input, Button } from "./styles";
import { useAuth } from "../../hooks/auth";
import { useLocation,useNavigate } from "react-router-dom";
import { log } from "console";
const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar o loading
    const { signIn, register } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const path = location.pathname;
    const page = path.split("/").filter(Boolean)[0];

    const handleLogin = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true); // Ativa o loading
        const asyncHandler = async () => {
            try {
                if (page == "login") {
                    const res=await signIn(email, password);
                    //res é uma promise
                    if(res){
                        navigate("/home");}

                } else {
                    if (password !== confirmPassword) {
                        alert("Senhas não conferem");
                        return;
                    } else {
                        const registered = await register(email, password);
                        if (registered) {
                            navigate("/login");
                            setEmail("");
                            setPassword("");
                        }
                    }
                }
            } finally {
                setIsLoading(false); // Desativa o loading após a conclusão
            }
        };
        asyncHandler();
    }, [email, password, confirmPassword, page, signIn, register, navigate]);


    return (
        <Container>
            <LoginForm onSubmit={handleLogin}>
                <Title>{page=="login" ? "Login" : "Register" }</Title>
                <FormField>
                    <Label>Email:</Label>
                    <Input 
                        type="text" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}  
                        required 
                    />
                </FormField>
                <FormField>
                    <Label>Senha:</Label>
                    <Input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </FormField>
                {page=="register" && (
                    <FormField>
                        <Label>Confirme a senha:</Label>
                        <Input 
                            type="password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required 
                        />
                    </FormField>
                )}
                <Button type="submit">Entrar</Button>
                {isLoading && <p>Carregando...</p>}
            </LoginForm>
        </Container>
    );
};

export default Login;