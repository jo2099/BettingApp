import React, { useEffect } from "react";
import { Container } from "./styles";

const Perfil: React.FC = () => {
    const [contador, setContador] = React.useState(0);

    useEffect(() => {
        const eventSource = new EventSource("http://localhost:5000/user/profile");

        eventSource.onmessage = (event) => {
            console.log(event.data);
            setContador((prev) => prev + 1);
        };

        // Limpar o eventSource quando o componente for desmontado
        return () => {
            eventSource.close();
        };
    }, []);

    useEffect(() => {
        console.log(contador);
    }, [contador]);

    return (
        <Container>
            <h1>Perfil</h1>
            <p>Contador: {contador}</p>
        </Container>
    );
};

export default Perfil;