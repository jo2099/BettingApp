import React, { useEffect, useState } from "react";
import { Container, LeftSection, RightSection, ProfilePicture, Button, UserData, ImageContainer,HistoryCardLayout,HistoryCardContainer } from "./styles";
import { useNavigate } from "react-router-dom";
import DonaGoldImage from '../../assets/DonaGold.png'; // Caminho correto para a imagem
import { getBets } from "../../api";

interface HistoryCardProps {
    bet: String;
    result: String;
    date: String;
    team1: String;
    team2: String;
    won: Boolean;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ bet, result, date, team1, team2, won }) => {
    // Converte a string de data em um objeto Date
    const formattedDate = new Date(String(date));

    // Extrai o dia, mês e ano
    const day = String(formattedDate.getDate()).padStart(2, '0');
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0'); // getMonth() retorna de 0 a 11
    const year = formattedDate.getFullYear();

    // Formata a data como dd/mm/yyyy
    const formattedDateString = `${day}/${month}/${year}`;

    //coloca no maximo duas casas decimais em bet
    bet = parseFloat(String(bet)).toFixed(2);

    return (
        <HistoryCardContainer>
            <p>Data: {formattedDateString}</p>
            <p>Aposta: <label className={won? "green-text":"red-text"}>{won ? '+' :'-' }{bet}</label></p>
            <p>{team1} X {team2}</p>
            <p>Resultado: {result}</p>
            <p className={won? "green-text":"red-text"}>{won ? 'Ganhou' : 'Perdeu'}</p>
        </HistoryCardContainer>
    );
}

const Perfil: React.FC = () => {
    const [bets, setBets] = useState<{"bet":String,"result":String,"date":String,"team1":String,"team2":String,"won":Boolean}[]>([]);
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

    useEffect(() => {
        const userId = localStorage.getItem('@id');
        if (userId) {
            getBets(userId).then((response) => {
                setBets(response);
                console.log("response", response);
            });
        }
    }, []);


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
                    <HistoryCardLayout>
                        {bets.map((bet, index) => (
                            <HistoryCard key={index} bet={bet.bet} result={bet.result} date={bet.date} team1={bet.team1} team2={bet.team2} won={bet.won} />
                        ))}
                    </HistoryCardLayout>
                )}
            </RightSection>
        </Container>
    );
};

export default Perfil;