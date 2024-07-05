import React from "react";
import { Container } from "./styles";
import basketball from "../../assets/basketball.svg";
import football from "../../assets/soccer-ball.svg";
import tennis from "../../assets/tennis.svg";

const SportsButtons: React.FC = () => {
    return (
        <Container>
            <button>
                <img src={football} alt="Futebol" width="20px" height="20px"/>
                Futebol
            </button>
            <button>
                <img src={basketball} alt="Basket" width="20px" height="20px"/>
                Basquete
            </button>
            <button>
                <img src={tennis} alt="Tênis" width="20px" height="20px"/>
                Tennis
            </button>
        </Container>
    );
};

export default SportsButtons;