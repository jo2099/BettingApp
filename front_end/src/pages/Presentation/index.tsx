import React, { useEffect } from "react";
import { Container} from "./styles";
// import TypingText from "../../components/TypingText";
import {Cursor,useTypewriter} from "react-simple-typewriter";
const Presentation: React.FC = () => {

    const text = useTypewriter({
        words: ["Entretenimento","Propósito"],
        loop: 0,
        typeSpeed: 100,
    });
    
    return (
        <Container>
            <div>
                <h1>
                    {text[0]}
                    <Cursor/>
                </h1>
            </div>
            <div>
                <p>Sua aposta, nossa causa!
                No nosso site, estamos transformando cada aposta em uma oportunidade para fazer o bem. Parte da nossa arrecadação é destinada a apoiar causas importantes, fazendo com que cada jogada não apenas seja emocionante, mas também significativa.</p>
            </div>
        </Container>
    );
}

export default Presentation;