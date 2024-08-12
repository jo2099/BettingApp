import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    height: 100vh; /* Ocupa toda a altura da tela */
    width: 100vw; /* Ocupa toda a largura da tela */
`;

export const LeftSection = styled.div`
    flex: 1; /* Ocupa uma proporção do espaço disponível */
    padding: 20px;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    align-items: center; /* Centraliza o conteúdo horizontalmente */
    
    box-sizing: border-box; /* Inclui padding e border no cálculo da largura */
`;

export const RightSection = styled.div`
    flex: 3; /* Ocupa mais espaço do que a seção esquerda */
    padding: 20px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center; /* Centraliza o conteúdo horizontalmente */
    justify-content: center; /* Centraliza o conteúdo verticalmente */
    box-sizing: border-box; /* Inclui padding no cálculo da largura */
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
    box-sizing: border-box; /* Inclui border no cálculo da largura */
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