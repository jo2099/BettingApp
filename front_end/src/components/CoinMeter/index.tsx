import React,{useEffect} from "react";
import { Container } from "./styles";
import coinImg from "../../assets/DonaGold.png";
import { useUserData } from "../../hooks/userData";
import { set } from "date-fns";
const CoinMeter: React.FC = () => {
    const { coins,setCoins } = useUserData();
    
    
    return (
        <Container>
            <img src={coinImg} alt="coin" />
            <p>{coins.toFixed(2)}</p>
        </Container>
    );
 
}

export default CoinMeter;