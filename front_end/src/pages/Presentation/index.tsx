import React, { useEffect, useState } from "react";
import { Container, TextContent} from "./styles";
// import TypingText from "../../components/TypingText";
import Maos from "../../assets/maos.jpg";
import Stadium from "../../assets/stadium.jpg";
import {Cursor,useTypewriter} from "react-simple-typewriter";

const Presentation: React.FC = () => {
    const [imgAtual, setImgAtual] = useState(Stadium);
    const [wordIndex, setWordIndex] = useState(0);

    const words = ["Entretenimento","Propósito"];
    const images = [Maos, Stadium];

    const text = useTypewriter({
        words: words,
        loop: 0,
        typeSpeed: 90,
        onDelay: () => {
            setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        },
    });

    useEffect(() => {
        setImgAtual(images[wordIndex]);
    },[wordIndex]);
    
    return (
        <Container>
            <img  key={wordIndex} src={imgAtual} alt="" />
            <div>
                <h1>
                    {text[0]}
                    <Cursor />
                </h1>
                <p>Sua aposta, nossa causa!
                No DonaBet, estamos transformando cada aposta em uma oportunidade para fazer o bem. Parte da nossa arrecadação é destinada a apoiar causas importantes, fazendo com que cada jogada não apenas seja emocionante, mas também significativa.</p>
            </div>
        </Container>
    );
}

export default Presentation;