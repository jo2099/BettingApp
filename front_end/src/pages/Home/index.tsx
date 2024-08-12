import React, { useEffect, useRef, useState } from "react";
import { Container } from "./styles";
import BetCard from "../../components/betCard";
import { IBetCardProps } from "../../components/betCard";
import CardLayout from "../../components/CardLayout";
import SportsButtons from "../../components/SportsButtons";
import useSSE from "../../hooks/SSE";
const Home: React.FC = () => {

    const [selectedSport, setSelectedSport] = React.useState<string>("Futebol");
    const {addCallbackSSE,removeCallbackSSE } = useSSE();

    const [soccerCards,setSoccerCards]= useState<IBetCardProps[]>([]);
    const [basketballCards,setBasketballCards]= useState<IBetCardProps[]>([]);
    const [timers, setTimers] = useState<{ [key: string]: boolean }>({});
    
    const handleSportChange = (sport: string) => {
        setSelectedSport(sport);
    };
    const { eventSource, startSSE } = useSSE();
    
    const newGame=(data:any)=>{
        //decodifica o json 
        const obj = JSON.parse(data);
        // console.log(obj);
        if(obj.event === "new_game"){
            console.log("Novo jogo!!");
            console.log(obj.details);
            //cria um novo card no array do esporte
            const tipo = obj.details.tipo;
            if(tipo == "futebol") {
                setSoccerCards((prev) => {
                    return [
                        ...prev,
                        {
                            team1: obj.details.time1,
                            team2: obj.details.time2,
                            gameid: obj.details.id,
                            score1: "0",
                            score2: "0",
                            temposSegundos: obj.details.temposSegundos,
                            temposIntervalos: obj.details.temposIntervalos,
                        },
                    ];
                });
            }
            else if(tipo == "basquete") {
                console.log("Novo jogo de basquete");
                setBasketballCards((prev) => {
                    return [
                        ...prev,
                        {
                            team1: obj.details.time1,
                            team2: obj.details.time2,
                            gameid: obj.details.id,
                            score1: "0",
                            score2: "0",
                            temposSegundos: obj.details.temposSegundos,
                            temposIntervalos: obj.details.temposIntervalos,
                        },
                    ];
                });
            }
        }
        else if(obj.event === "end_game"){
            //remove o card do array do esporte
            if(obj.details.tipo == "futebol") {
                console.log("Removendo jogo de futebol");
                setSoccerCards((prev) => {
                    console.log("Prev",prev); //printa o array de cards
                    return prev.filter((card) => card.gameid !== obj.details.id);
                });
            }
            else if(obj.details.tipo == "basquete") {
                console.log("Removendo jogo de basquete");
                setBasketballCards((prev) => {
                    console.log("Prev",prev); //printa o array de cards
                    return prev.filter((card) => card.gameid !== obj.details.id);
                });
            }
        }
    };
    useEffect(() => {
        console.log("Starting SSE");
        startSSE();
        addCallbackSSE(newGame);
    }, []);
    
    return (
        <Container>
            <SportsButtons onSelectedSport={handleSportChange} />
            <CardLayout>
                {selectedSport === "Futebol" && soccerCards.map((card) => (
                    <BetCard
                        key={card.gameid}
                        team1={card.team1}
                        team2={card.team2}
                        gameid={card.gameid}
                        score1={card.score1}
                        score2={card.score2}
                        temposSegundos={card.temposSegundos}
                        temposIntervalos={card.temposIntervalos}
                    />
                ))}
                {selectedSport === "Basquete" && basketballCards.map((card) => (
                    <BetCard
                        key={card.gameid}
                        team1={card.team1}
                        team2={card.team2}
                        gameid={card.gameid}
                        score1={card.score1}
                        score2={card.score2}
                        temposSegundos={card.temposSegundos}
                        temposIntervalos={card.temposIntervalos}
                    />
                ))}
            
            </CardLayout>
        </Container>
    );
};

export default Home;