import React from "react";
import { Container } from "./styles";
import BetCard from "../../components/betCard";
import CardLayout from "../../components/CardLayout";
import SportsButtons from "../../components/SportsButtons";

const Home: React.FC = () => {
    return (
        <Container>
            <SportsButtons />
            <CardLayout>
                <BetCard team1="Flamengo" team2="Vasco" />
                <BetCard team1="Internacional" team2="Grêmio" />
                <BetCard team1="Fluminense" team2="Palmeiras" />
                <BetCard team1="São Paulo" team2="Corinthians" />
                <BetCard team1="Atlético-MG" team2="Cruzeiro" />
                <BetCard team1="Botafogo" team2="Santos" />
                <BetCard team1="Bahia" team2="Vitória" />
                <BetCard team1="Sport" team2="Náutico" />
            </CardLayout>
        </Container>
    );
};

export default Home;