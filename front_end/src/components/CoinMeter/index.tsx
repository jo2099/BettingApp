import React from "react";
import { Container } from "./styles";
import coinImg from "../../assets/coin.svg";
import { useUserData } from "../../hooks/userData";
const CoinMeter: React.FC = () => {
    const { coins } = useUserData();
    return (
        <Container>
            <img src={coinImg} alt="coin" />
            <p>{coins}</p>
        </Container>
    )
}

export default CoinMeter;