import styled from "styled-components";

export const Grid = styled.div`
    display:grid;
    grid-template-areas:
        'header header'
        'aside content';
    grid-template-columns: 15vw 85vw;
    grid-template-rows: 8vh 92vh;
    height: 100vh;
`;