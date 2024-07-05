import React from "react";
import { Container } from "./styles";

interface IBetCardProps {
    team1: string;
    team2: string;
}

const BetCard: React.FC<IBetCardProps> = ({team1,team2}) => {
  return (
    <Container>
      <p>{team1} X {team2}</p>
    </Container>
  );
}

export default BetCard;