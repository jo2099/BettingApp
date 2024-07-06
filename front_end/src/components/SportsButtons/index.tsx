import React from "react";
import { Container } from "./styles";
import basketball from "../../assets/basketball.svg";
import football from "../../assets/soccer-ball.svg";
import tennis from "../../assets/tennis.svg";

interface ISportsButtonsProps {
    onSelectedSport?: (sport: string) => void; //recebe uma funcao e executará a funcao quando o botao for clicado
}


const SportsButtons: React.FC<ISportsButtonsProps> = ({onSelectedSport}) => {
    return (
        <Container>
            <button onClick={() => onSelectedSport && onSelectedSport('Futebol')}>
                <img src={football} alt="Futebol" width="20px" height="20px"/>
                Futebol
            </button>
            <button onClick={() => onSelectedSport && onSelectedSport('Basquete')}>
                <img src={basketball} alt="Basket" width="20px" height="20px"/>
                Basquete
            </button>
            <button onClick={() => onSelectedSport && onSelectedSport('Tênis')}>
                <img src={tennis} alt="Tênis" width="20px" height="20px"/>
                Tênis
            </button>
        </Container>
    );
};


export default SportsButtons;