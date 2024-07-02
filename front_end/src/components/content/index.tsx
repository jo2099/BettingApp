
import React from "react";
import { Container } from "./styles";
interface IContentProps {
    children: React.ReactNode;
}


const Content: React.FC<IContentProps> = ({children}) => {
    return(
        <Container>
            <h1>Content</h1>
        </Container>
    );
};

export default Content;