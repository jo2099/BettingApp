import React, { useEffect, useState } from "react";
import { Container, LeftSection, RightSection, ProfilePicture, Button, UserData, ImageContainer,HistoryCardLayout,HistoryCardContainer, RewardsCardsContainer, RewardCard } from "./styles";
import { useNavigate } from "react-router-dom";
import DonaGoldImage from '../../assets/DonaGold.png'; // Caminho correto para a imagem
import { getBets, getRewards, getTeams } from "../../api";
import { useAuth } from "../../hooks/auth";
interface HistoryCardProps {
    bet: String;
    betted: String;
    result: String;
    date: String;
    team1: String;
    team2: String;
    won: Boolean;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ bet, betted,result, date, team1, team2, won }) => {
    const formatteddate = new Date(String(date));

    // Extrai o dia, mês e ano
    const day = formatteddate.getUTCDate();
    const month = formatteddate.getUTCMonth() + 1; // getUTCMonth retorna o mês de 0 a 11, por isso somamos 1
    const year = formatteddate.getUTCFullYear();

    // Formata a data como dd/mm/yyyy
    const formattedDateString = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

    //coloca no maximo duas casas decimais em bet
    bet = parseFloat(String(bet)).toFixed(2);

    return (
        <HistoryCardContainer>
            <div>
            <p>Data</p>
            <p> {formattedDateString}</p>
            </div>
            <div>
            <p>{team1} X {team2}</p>
            </div>
            <div>
            <p>Aposta</p>
            <p>{bet}</p>
            </div>
            <div>
            <p>Ganhador</p>
            <p>{result}</p>
            </div>
            <div>
                <p>Resultado</p>
                <p  className={won? "green-text":"red-text"}>{won ? '+' :'-' }{bet}</p>
            </div>
            <div>
            <p className={won? "green-text":"red-text"}>{won ? 'Ganhou' : 'Perdeu'}</p>
            </div>
        </HistoryCardContainer>
    );
}

const Perfil: React.FC = () => {
    const [bets, setBets] = useState<{"bet":String,"betted":String,"result":String,"date":String,"team1":String,"team2":String,"won":Boolean}[]>([]);
    const [rewards, setRewards]= useState<{"rewardTitle":String,"price":String,"user_id":number,"id":number}[]>([]);
    const [teams, setTeams] = useState<{"id":number,"nome":String}[]>([]);
    const [favTeam, setFavTeam] = useState<number>(-1);
    const navigate = useNavigate();
    const {signOut} = useAuth();
    const [view, setView] = useState<string>('userData'); // Estado para controlar o conteúdo exibido
    const handleButtonClick = (viewType: string) => {
        setView(viewType); // Atualiza o estado para mostrar o conteúdo correspondente
    };

    const handleLogout = () => {
        signOut();
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
                    <>
                    {favTeam === -1 && (
                        <>
                        <h1>Escolha um time do coração</h1>
                        <select value={favTeam} onChange={(e) =>( setFavTeam(Number(e.target.value)))}>
                            <option value={-1}>Escolha um time</option>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>
                                    {team.nome}
                                </option>
                            ))}
                        </select>
                        </>
                    )}
                    {favTeam !== -1 && (
                        <RewardsCardsContainer>
                        {rewards.map((reward, index) => (
                            <RewardCard key={index}>
                                <h4>{reward.rewardTitle}</h4>
                                <p>{reward.price}</p>
                                <Button onClick={() => alert('Comprar Prêmio')}>Comprar</Button>
                            </RewardCard>
                        ))}
                    </RewardsCardsContainer>
                    )}
                    </>
                )}
                {view === 'betHistory' && (
                    <HistoryCardLayout id="aaa">
                        {/* {bets.map((bet, index) => (
                            <HistoryCard key={index} bet={bet.bet} betted={bet.betted} result={bet.result} date={bet.date} team1={bet.team1} team2={bet.team2} won={bet.won} />
                        ))} */}
                        <HistoryCard
                            bet="50.00"
                            betted="Team A"
                            result="Team A"
                            date="2022-01-05"
                            team1="Team A"
                            team2="Team B"
                            won={true}
                        />

                        <HistoryCard
                            bet="60.00"
                            betted="Team B"
                            result="Team A"
                            date="2022-01-06"
                            team1="Team A"
                            team2="Team B"
                            won={false}
                        />

                        <HistoryCard
                            bet="70.00"
                            betted="Team A"
                            result="Team A"
                            date="2022-01-07"
                            team1="Team A"
                            team2="Team B"
                            won={true}
                        />

                        <HistoryCard
                            bet="80.00"
                            betted="Team B"
                            result="Team A"
                            date="2022-01-08"
                            team1="Team A"
                            team2="Team B"
                            won={false}
                        />

                        <HistoryCard
                            bet="90.00"
                            betted="Team A"
                            result="Team A"
                            date="2022-01-09"
                            team1="Team A"
                            team2="Team B"
                            won={true}
                        />

                        <HistoryCard
                            bet="100.00"
                            betted="Team B"
                            result="Team A"
                            date="2022-01-10"
                            team1="Team A"
                            team2="Team B"
                            won={false}
                        />

                        <HistoryCard
                            bet="110.00"
                            betted="Team A"
                            result="Team A"
                            date="2022-01-11"
                            team1="Team A"
                            team2="Team B"
                            won={true}
                        />

                        <HistoryCard
                            bet="120.00"
                            betted="Team B"
                            result="Team A"
                            date="2022-01-12"
                            team1="Team A"
                            team2="Team B"
                            won={false}
                        />

                            <HistoryCard
                                bet="130.00"
                                betted="Team A"
                                result="Team A"
                                date="2022-01-13"
                                team1="Team A"
                                team2="Team B"
                                won={true}
                            />

                            <HistoryCard
                                bet="140.00"
                                betted="Team B"
                                result="Team A"
                                date="2022-01-14"
                                team1="Team A"
                                team2="Team B"
                                won={false}
                            />

                            <HistoryCard
                                bet="150.00"
                                betted="Team A"
                                result="Team A"
                                date="2022-01-15"
                                team1="Team A"
                                team2="Team B"
                                won={true}
                            />

                            </HistoryCardLayout>
                )}
            </RightSection>
        </Container>
    );
};

export default Perfil;