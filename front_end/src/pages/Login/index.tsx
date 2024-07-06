import React, { useState } from "react";
import { Container, LoginForm, Title, FormField, Label, Input, Button } from "./styles";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Username:", username);
        console.log("Password:", password);
    };

    return (
        <Container>
            <LoginForm onSubmit={handleLogin}>
                <Title>Login</Title>
                <FormField>
                    <Label>Usuário:</Label>
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
                <Button type="submit">Entrar</Button>
            </LoginForm>
        </Container>
    );
};

export default Login;