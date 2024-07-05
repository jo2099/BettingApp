import styled from "styled-components";


export const CardGrid = styled.div`
    display: grid;
    grid-gap: 20px;
    width: 100%;
    height: 100%;
    grid-template-columns: repeat(auto-fill, minmax(300px, 305fr));
    padding: 20px;
    justify-content: center;
    justify-items: center;
    align-items: center;
`;