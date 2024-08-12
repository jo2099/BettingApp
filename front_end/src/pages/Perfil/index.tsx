import React, { useEffect, useState } from "react";
import { Container, LeftSection, RightSection, ProfilePicture, Button, UserData, ImageContainer } from "./styles";
import { useNavigate } from "react-router-dom";
import DonaGoldImage from '../../assets/DonaGold.png'; // Caminho correto para a imagem

const Perfil: React.FC = () => {
    const [contador, setContador] = React.useState(0);
    const navigate = useNavigate();
    const [view, setView] = useState<string>('userData'); // Estado para controlar o conteúdo exibido
    const handleButtonClick = (viewType: string) => {
        setView(viewType); // Atualiza o estado para mostrar o conteúdo correspondente
    };

    const handleLogout = () => {
        alert('Logout'); // Lógica de logout a ser implementada
        //volta para a pagina home
        
    };

    const handleGoBack = () => {
        navigate("/home");
    };


    return (
        <Container>
            <LeftSection>
                <ProfilePicture>Foto</ProfilePicture>
                <Button onClick={() => handleButtonClick('userData')}>Perfil</Button>
                <Button onClick={()=> handleButtonClick('betHistory')}>Histórico de Apostas</Button>
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
                        <Button onClick={() => alert('Comprar DonaGold')}>Comprar DonaGold</Button>
                        <Button onClick={() => alert('Mostrar Histórico de Compras')}>Mostrar Histórico de Compras</Button>
                    </>
                )}
                {view === 'premios' && (
                    <p>Sessão de Prêmios - Conteúdo específico ainda não implementado.</p>
                )}
                {view === 'betHistory' && (
                    <p>Histórico de Apostas - Conteúdo específico ainda não implementado.</p>
                )}
            </RightSection>
        </Container>
    );
};

export default Perfil;