import React from "react";
import { Grid } from "./styles";
import { MainHeader } from "../MainHeader";
import Content from "../content";
interface ILayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    return( 
        <Grid>
            <MainHeader />
            <Content>
                {children}
            </Content>
        </Grid>
    );
}

export default Layout;