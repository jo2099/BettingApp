import styled from "styled-components";


export const CardGrid = styled.div`
    display: grid;
    grid-gap: 20px;
    row-gap: 35px;
    width: 70%;
    height: 90%;
    grid-template-columns: repeat(3,1fr);
    overflow-y: auto;
    padding: 20px;
    justify-content: center;
    justify-items: center;
    align-items: center;

    &::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`;