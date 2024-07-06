import styled from "styled-components";

export const Grid = styled.div`
    display:grid;
    grid-template-areas:
        'header'
        'content';
    /* grid-template-columns: 15vw 85vw; */
    grid-template-rows: 7vh 93vh;
    height: 100vh;
`;