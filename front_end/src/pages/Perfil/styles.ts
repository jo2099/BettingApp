import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    height: 100%; /* Ocupa toda a altura da tela */
    width: 100%; /* Ocupa toda a largura da tela */
    overflow: auto;
`;

export const LeftSection = styled.div`
    /* Ocupa uma proporção do espaço disponível */
    /* flex: 1;  */
    padding: 20px;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    align-items: center; /* Centraliza o conteúdo horizontalmente */
    width: 20%;
    height: 100%;
`;

export const RightSection = styled.div`
    /* flex: 3; Ocupa mais espaço do que a seção esquerda */
    width: 80%;
    padding: 20px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center; /* Centraliza o conteúdo horizontalmente */
    justify-content: center; /* Centraliza o conteúdo verticalmente */
    height: 100%;
`;

export const ProfilePicture = styled.div`
    width: 120px;
    height: 120px;
    background-color: #e0e0e0;
    border: 2px solid #ccc;
    border-radius: 50%; /* Faz um círculo */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px; /* Espaço entre a foto e os botões */
    font-size: 20px;
    color: #666;
`;

export const Button = styled.button`
    width: 100%;
    padding: 15px;
    margin: 10px 0; /* Espaçamento vertical entre os botões */
    border: none;
    border-radius: 8px; /* Bordas arredondadas */
    background-color: #007bff; /* Cor de fundo dos botões */
    color: #fff; /* Cor do texto dos botões */
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease; /* Efeito de transição */

    &:hover {
        background-color: #0056b3; /* Cor de fundo ao passar o mouse */
    }

    &:active {
        transform: scale(0.98); /* Efeito de clique */
    }
`;

export const UserData = styled.div`
    text-align: center; /* Centraliza o texto */
    color: white;
    max-width: 800px; /* Limita a largura máxima dos dados do usuário */
    margin: 0 auto; /* Centraliza horizontalmente */
`;

export const ImageContainer = styled.div`
    margin-bottom: 20px; /* Espaço entre a imagem e o contador */
    display: flex;
    justify-content: center; /* Centraliza a imagem horizontalmente */
    width: 100%; /* Ocupa toda a largura disponível */
    
    img {
        max-width: 300px; /* Ajuste o tamanho máximo da imagem */
        height: auto; /* Mantém a proporção da imagem */
        display: block; /* Remove espaço abaixo da imagem */
    }
`;

export const HistoryCardLayout = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */
    width: 100%;
    height: 90%;
    overflow-y: scroll;
    `;

export const HistoryCardContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* flex-grow: 1; */
    width: 100% ;
    height: 10%;
    margin-bottom: 10px;
    background-color: white;
    color: black;
    border-radius: 8px;
    flex-shrink: 0;
    flex-grow: 0;



    .green-text {
        color: green;
    }

    .red-text {
        color: red;
    }

    div{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 75%;
    }
`;

export const RewardsCardsContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 90%;
    height: 90%;
    margin-bottom: 10px;
    color: black;
    border-radius: 8px;

    .green-text {
        color: green;
    }

    .red-text {
        color: red;
    }
`;

export const RewardCard= styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 10%;
    margin-bottom: 10px;
    background-color: white;
    color: black;
    border-radius: 8px;

    .green-text {
        color: green;
    }

    .red-text {
        color: red;
    }
`;
