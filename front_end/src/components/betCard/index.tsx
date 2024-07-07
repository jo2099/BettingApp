import React from "react";
import { CardButtons, CardHeader, Container,StyledInput } from "./styles";
import { Type } from "typescript";

interface IBetCardProps {
    team1: string;
    team2: string;
    score1?: string;
    score2?: string;
}
type ButtonId = '1' | 'X' | '2';

const BetCard: React.FC<IBetCardProps> = ({team1,team2,score1,score2}) => {

  const [activeButton, setActiveButton] = React.useState<null | '1' | 'X' | '2'>(null);
  const [inputValue, setInputValue] = React.useState<string>('0');
  
  return (
    <Container >
      <CardHeader>
      <h4>{team1} X {team2}</h4>
      <p>{score1} X {score2}</p>
      <label>00:00</label>
      </CardHeader>
      <CardButtons>
      <div>
          {['1', 'X', '2'].map((buttonId) => (
            activeButton === buttonId ? 
              <StyledInput key={buttonId} type="number" placeholder="0" autoFocus onBlur={() => setActiveButton(null)}  onChange={(event)=>{setInputValue(event.target.value);}}/> : 
              <button key={buttonId} onClick={() => setActiveButton(buttonId as ButtonId )}>
                <h3>{buttonId}</h3>
                <span>{buttonId === '1' ? '1.4' : buttonId === 'X' ? '2.4' : '3.4'}</span>
              </button>
          ))}
        </div>
        <div id="confirm" className={activeButton ? "visible" : "hidden"}>
          <button onMouseDown={(event)=>event.preventDefault()} onClick={()=>console.log(inputValue)}>Confirmar</button>
        </div>
        
      </CardButtons>
    </Container>
  );
}

export default BetCard;