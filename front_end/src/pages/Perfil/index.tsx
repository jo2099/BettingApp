import React, { useEffect, useState } from "react";
import { Container, LeftSection, RightSection, ProfilePicture, Button, UserData, ImageContainer } from "./styles";
import DonaGoldImage from '../../assets/DonaGold.png'; // Caminho correto para a imagem

const Perfil: React.FC = () => {
    const [contador, setContador] = React.useState(0);
    const [view, setView] = useState<string>('userData'); // Estado para controlar o conteúdo exibido

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

    const handleButtonClick = (viewType: string) => {
        setView(viewType); // Atualiza o estado para mostrar o conteúdo correspondente
    };

    const handleLogout = () => {
        alert('Logout'); // Lógica de logout a ser implementada
    };

    const handleGoBack = () => {
        alert('Voltar'); // Lógica para voltar para pagina de apostas
    };

    return (
        <Container>
            <LeftSection>
                <ProfilePicture>Foto</ProfilePicture>
                <Button onClick={() => handleButtonClick('userData')}>Perfil</Button>
                <Button onClick={() => handleButtonClick('addDonaGold')}>Adicionar DonaGold</Button>
                <Button onClick={() => handleButtonClick('premios')}>Sessão de Prêmios</Button>
                <Button onClick={handleGoBack}>Pagina de Apostas</Button>
                <Button onClick={handleLogout}>Sair</Button>
            </LeftSection>
            <RightSection>
                {view === 'userData' && (
                    <UserData>
                        <h1>Nome do Usuário</h1>
                        <p>Email: usuario@example.com</p>
                        <p>Telefone: (11) 98765-4321</p>
                        <p>Endereço: Rua Fictícia, 123 - Cidade, Estado</p>
                    </UserData>
                )}
                {view === 'addDonaGold' && (
                    <>
                        <ImageContainer>
                            <img src={DonaGoldImage} alt="DonaGold" />
                        </ImageContainer>
                        <p>Contador: {contador}</p>
                        <Button onClick={() => alert('Comprar DonaGold')}>Comprar DonaGold</Button>
                        <Button onClick={() => alert('Mostrar Histórico de Compras')}>Mostrar Histórico de Compras</Button>
                    </>
                )}
                {view === 'premios' && (
                    <p>Sessão de Prêmios - Conteúdo específico ainda não implementado.</p>
                )}
            </RightSection>
        </Container>
    );
};

export default Perfil;