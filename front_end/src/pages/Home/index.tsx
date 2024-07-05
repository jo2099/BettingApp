import React from "react";
import { Container } from "./styles";
import BetCard from "../../components/betCard";
import CardLayout from "../../components/CardLayout";

const Home: React.FC = () => {
    return(
        <Container>
            <CardLayout>
                <BetCard team1="Flamengo" team2="Vasco" />
                <BetCard team1="Flamengo" team2="Vasco" />
                <BetCard team1="Flamengo" team2="Vasco" />
                <BetCard team1="Flamengo" team2="Vasco" />
            </CardLayout>
        </Container>
    );
};

export default Home;