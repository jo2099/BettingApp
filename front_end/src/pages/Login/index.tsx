import React, { useState,useCallback } from "react";
import { Container, LoginForm, Title, FormField, Label, Input, Button } from "./styles";
import { useAuth } from "../../hooks/auth";
import { useLocation } from "react-router-dom";
const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {signIn,register} = useAuth();
    const location = useLocation();

    const path= location.pathname;
    const page = path.split("/").filter(Boolean)[0];

    const handleLogin = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(page=="login"){
        signIn(username, password);

    }else{
        if(password !== confirmPassword){
            alert("Senhas não conferem");
            return;
        }else{
            register(username, password);
        }
    }
    }, [username, password,confirmPassword]); // useCallback para evitar recriações desnecessárias da função

    console.log(page)

    return (
        <Container>
            <LoginForm onSubmit={handleLogin}>
                <Title>{page=="login" ? "Login" : "Register" }</Title>
                <FormField>
                    <Label>Email:</Label>
                    <Input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}  
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
            </LoginForm>
        </Container>
    );
};

export default Login;