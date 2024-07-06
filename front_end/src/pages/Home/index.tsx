import React from "react";
import { Container } from "./styles";
import BetCard from "../../components/betCard";
import CardLayout from "../../components/CardLayout";
import SportsButtons from "../../components/SportsButtons";

const Home: React.FC = () => {

    const [selectedSport, setSelectedSport] = React.useState<string>("Futebol");

    let soccerCards=[{team1:"Flamengo", team2:"Vasco",score1:"3",score2:"1"} ,{team1:"São Paulo", team2:"Corinthians",score1:"2",score2:"2"},{team1:"Palmeiras", team2:"Santos",score1:"1",score2:"0"},{team1:"Grêmio", team2:"Internacional",score1:"0",score2:"1"},{team1:"Cruzeiro", team2:"Atlético-MG",score1:"2",score2:"2"},{team1:"Fluminense", team2:"Botafogo",score1:"1",score2:"1"},{team1:"Bahia", team2:"Vitória",score1:"3",score2:"2"},{team1:"Sport", team2:"Náutico",score1:"2",score2:"1"}];
    let basketballCards=[{team1:"Lakers", team2:"Warriors",score1:"110",score2:"105"},{team1:"Bulls", team2:"Celtics",score1:"98",score2:"102"},{team1:"Rockets", team2:"Spurs",score1:"115",score2:"112"},{team1:"Heat", team2:"Nets",score1:"105",score2:"100"},{team1:"Clippers", team2:"Suns",score1:"112",score2:"108"},{team1:"Raptors", team2:"76ers",score1:"102",score2:"99"},{team1:"Mavericks", team2:"Nuggets",score1:"110",score2:"115"},{team1:"Trail Blazers", team2:"Jazz",score1:"100",score2:"105"}];
    let tennisCards=[{team1:"Nadal", team2:"Djokovic",score1:"2",score2:"1"},{team1:"Federer", team2:"Murray",score1:"2",score2:"0"},{team1:"Nadal", team2:"Federer",score1:"2",score2:"1"},{team1:"Djokovic", team2:"Murray",score1:"2",score2:"0"},{team1:"Nadal", team2:"Murray",score1:"2",score2:"1"},{team1:"Djokovic", team2:"Federer",score1:"2",score2:"0"},{team1:"Nadal", team2:"Djokovic",score1:"2",score2:"1"},{team1:"Federer", team2:"Murray",score1:"2",score2:"0"}];
    const handleSportChange = (sport: string) => {
        setSelectedSport(sport);
    }
    
    return (
        <Container>
            <SportsButtons onSelectedSport={handleSportChange} />
            <CardLayout>
                {selectedSport === "Futebol" && soccerCards.map((card, index) => <BetCard key={index} team1={card.team1} team2={card.team2} score1={card.score1} score2={card.score2} />)}
                {selectedSport === "Basquete" && basketballCards.map((card, index) => <BetCard key={index} team1={card.team1} team2={card.team2} score1={card.score1} score2={card.score2} />)}
                {selectedSport === "Tênis" && tennisCards.map((card, index) => <BetCard key={index} team1={card.team1} team2={card.team2} score1={card.score1} score2={card.score2} />)}
            </CardLayout>
        </Container>
    );
};

export default Home;