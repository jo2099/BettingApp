import React from "react";
import {CardGrid} from "./styles";

interface ICardLayoutProps {
    children: React.ReactNode;
}

const CardLayout:React.FC<ICardLayoutProps> = ({children}) => {
    return (
        <CardGrid>
            {children}
        </CardGrid>
    );
};

export default CardLayout;