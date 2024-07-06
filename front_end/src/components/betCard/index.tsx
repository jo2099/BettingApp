import React from "react";
import { CardButtons, CardHeader, Container } from "./styles";

interface IBetCardProps {
    team1: string;
    team2: string;
    score1?: string;
    score2?: string;
}

const BetCard: React.FC<IBetCardProps> = ({team1,team2,score1,score2}) => {
  return (
    <Container>
      <CardHeader>
      <h4>{team1} X {team2}</h4>
      <p>{score1} X {score2}</p>
      <label>00:00</label>
      </CardHeader>
      <CardButtons>
        <button>
          <h3>1</h3>
          <span>1.4</span>
        </button>
        <button>
          <h3>X</h3>
          <span>2.4</span>
        </button>
        <button>
          <h3>2</h3>
          <span>3.4</span>
        </button>
      </CardButtons>
    </Container>
  );
}

export default BetCard;