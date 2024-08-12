import React, { useEffect, useMemo,useState } from "react";
import { CardButtons, CardHeader, Container,StyledInput,MiddleDiv } from "./styles";
import { Type } from "typescript";
import { time } from "console";
import useSSE from "../../hooks/SSE";
import { event } from "jquery";
import { useGameData } from "../../hooks/gameData";
import { getGameData } from "../../api";
export interface IBetCardProps {
    team1: string;
    team2: string;
    gameid: string;
    score1?: string;
    score2?: string;
}
type ButtonId = '1' | 'X' | '2';

const BetCard: React.FC<IBetCardProps> = ({ gameid, team1, team2, score1, score2 }) => {
  const [activeButton, setActiveButton] = useState<null | '1' | 'X' | '2'>(null);
  const [inputValue, setInputValue] = useState<string>('0');
  const [running, setRunning] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(0);
  const [Score1, setScore1] = useState<string>('0');
  const [Score2, setScore2] = useState<string>('0');
  const { gameData,getGameData } = useGameData();

  // //escuta o evento de timer na rota /game/startTimer/:gameid
  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:5000/game/events/${gameid}`);
    const timerSource = new EventSource(`http://localhost:5000/game/timer/${gameid}`);
  
    eventSource.onmessage = (event) => {
      const obj = JSON.parse(event.data);
      console.log("Obj", obj);
  
      if (obj.event === "score") {
        if (obj.details.time == 1) {
          setScore1(obj.details.score);
        } else if (obj.details.time == 2) {
          setScore2(obj.details.score);
        }
      }
      else if (obj.event === "stop_game") {
        setRunning(false);
      }
      // else if(obj.event === "timer_update")
      // {
      //   setTimer(obj.details.timer);
      // }
    };
  
    timerSource.onmessage = (event) => {
      console.log("Timer", event.data);
      const data = JSON.parse(event.data);
      setTimer(parseInt(data.timer));
    };
  
    return () => {
      eventSource.close();
      console.log("EventSource and TimerSource closed");
    };
  }, [gameid]);

  

  // useEffect(() => {
  //   const fetchTimer = async () => {
  //     const data = await getGameData(gameid);
  //     console.log("Data",data);
  //     if(parseInt(data.timer))
  //     {
  //       setTimer(parseInt(data.timer));
  //     }
  //   }

  //   fetchTimer();
    
  //   const interval = setInterval(() => {
  //   setTimer((prev) => prev + 1);
  //   }, 1000);
  //   console.log("Timer",timer);
  //   return () => clearInterval(interval);
    
  // }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <Container>
      <CardHeader>
        <h4>{team1} X {team2}</h4>
        <p>{Score1} X {Score2}</p>
        <label>{formatTime(timer)}</label>
      </CardHeader>
      <MiddleDiv>
      </MiddleDiv>
      <CardButtons>
        <div>
          {['1', 'X', '2'].map((buttonId) => (
            activeButton === buttonId ? 
              <StyledInput key={buttonId} type="number" placeholder="0" autoFocus onBlur={() => setActiveButton(null)} onChange={(event) => { setInputValue(event.target.value); }} /> : 
              <button key={buttonId} onClick={() => setActiveButton(buttonId as ButtonId)}>
                <h3>{buttonId}</h3>
                <span>{buttonId === '1' ? '1.4' : buttonId === 'X' ? '2.4' : '3.4'}</span>
              </button>
          ))}
        </div>
        <div id="confirm" className={activeButton ? "visible" : "hidden"}>
          <button onMouseDown={(event) => event.preventDefault()} onClick={() => console.log(inputValue, activeButton, { team1 })}>Confirmar</button>
        </div>
      </CardButtons>
    </Container>
  );
};

export default BetCard;