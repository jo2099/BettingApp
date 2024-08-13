import React, { useEffect, useMemo,useState } from "react";
import { CardButtons, CardHeader, Container,StyledInput,MiddleDiv } from "./styles";
import { Type } from "typescript";
import { time } from "console";
import useSSE from "../../hooks/SSE";
import { event } from "jquery";
import { useGameData } from "../../hooks/gameData";
import { getGameData } from "../../api";
import { sendBet } from "../../api";
import { send } from "process";
import { json } from "stream/consumers";
export interface IBetCardProps {
    team1: string;
    team2: string;
    gameid: string;
    score1?: string;
    score2?: string;
    temposSegundos: number[]; 
    temposIntervalos: number[];
}
type ButtonId = '1' | 'X' | '2';

const BetCard: React.FC<IBetCardProps> = ({ gameid, team1, team2, score1, score2,temposSegundos,temposIntervalos }) => {
  const [activeButton, setActiveButton] = useState<null | '1' | 'X' | '2'>(null);
  const [inputVisible, setInputVisible] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('0');
  const [running, setRunning] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(0);
  const [timerIntervalo, setTimerIntervalo] = useState<number>(0);
  const [Score1, setScore1] = useState<string>('0');
  const [Score2, setScore2] = useState<string>('0');
  const {addCallbackEventSSE,removeCallbackEventSSE } = useSSE();
  const [tempoAtual, setTempoAtual] = useState(0);
  const [tempoIntervaloAtual, setTempoIntervaloAtual] = useState(0);
  const [periodoAtual, setPeriodoAtual] = useState(0);
  const [intervaloAtual, setIntervaloAtual] = useState(0);
  const [isIntervalo, setIsIntervalo] = useState(false);

  // //escuta o evento de timer na rota /game/startTimer/:gameid
  useEffect(() => {
    const handleupdate=(data:any)=>{
      // console.log("Data no card",data);
      const obj=JSON.parse(data);
      if (obj.event==="score"){
          if(obj.details.time==1){
              setScore1(String(obj.details.score));
          }
          else if(obj.details.time==2){
              setScore2(String(obj.details.score));
          }
      }
      
    }

    const data=getGameData(gameid);
    data.then((res)=>{
      console.log("Res",res);
      setTimer(parseInt(res.timer));
    } );

    addCallbackEventSSE(gameid,handleupdate);


  }, [gameid]);

  const calculateSomaTempos = (periodo: number) => {
    return temposSegundos.slice(0, periodo + 1).reduce((acc, curr) => acc + curr, 0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        if (!isIntervalo) {
          // Simulação do tempo de jogo
          if (timer < calculateSomaTempos(periodoAtual)) {
            setTimer((prevTimer) => prevTimer + 1);
          } else {
            if (periodoAtual < temposSegundos.length - 1) {
              setIsIntervalo(true);
            } else {
              setRunning(false); // Fim do jogo
            }
          }
        } else {
          // Simulação do tempo de intervalo
          console.log("Tempo de intervalo antes", timerIntervalo);
          setTimerIntervalo((prevTimerIntervalo) => {
            if (prevTimerIntervalo < temposIntervalos[intervaloAtual]) {
              console.log("Tempo de intervalo", prevTimerIntervalo + 1);
              return prevTimerIntervalo + 1;
            } else {
              setIsIntervalo(false);
              setIntervaloAtual((prevIntervaloAtual) => prevIntervaloAtual + 1);
              setPeriodoAtual((prevPeriodoAtual) => prevPeriodoAtual + 1);
              return 0; // Reseta o timerIntervalo
            }
          });
        }
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, [running, timer, periodoAtual, intervaloAtual, isIntervalo, temposIntervalos]);
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleConfirm = () => {
    const userid = String(localStorage.getItem('@id'));
    console.log("Userid",userid);
    const game_id = gameid;
    let winnerteam;
    if(activeButton === '1'){
      winnerteam = team1;
    } else if(activeButton === 'X'){
      winnerteam = 'Empate';
    }
    else{
      winnerteam = team2;
    }

    const bet={winner:winnerteam,betted_amount:inputValue};
    console.log("Bet",bet);
    setInputVisible(false);
    sendBet(game_id,userid,bet);

  }

  return (
    <Container>
      <CardHeader>
        <h4>{team1} X {team2}</h4>
        <p>{Score1} X {Score2}</p>
        <label>{formatTime(timer)}</label>
      </CardHeader>
      <MiddleDiv>
      </MiddleDiv>
      {inputVisible &&
      <CardButtons>
        <div>
          {['1', 'X', '2'].map((buttonId) => (
            activeButton === buttonId ? 
              <StyledInput key={buttonId} type="number" placeholder="0" autoFocus onBlur={() => setActiveButton(null)} onChange={(event) => { setInputValue(event.target.value); }} /> : 
              <button key={buttonId} onClick={() => setActiveButton(buttonId as ButtonId)}>
                <h3>{buttonId}</h3>
                <span>{buttonId === '1' ? '1.5' : buttonId === 'X' ? '1.1' : '2'}</span>
              </button>
          ))}
        </div>
        <div id="confirm" className={activeButton ? "visible" : "hidden"}>
          <button onMouseDown={(event) => event.preventDefault()} onClick={handleConfirm}>Confirmar</button>
        </div>
      </CardButtons>}
    </Container>
  );
};

export default BetCard;