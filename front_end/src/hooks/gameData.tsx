import React,{createContext, useState, useEffect, useContext} from 'react';

interface GameDataContextProps {
    gameData: any;
    getGameData: (gameid:string) => any;
    }

export const GameDataContext = createContext<GameDataContextProps>({
    gameData: {},
    getGameData: () => {},

});

export const GameDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [gameData, setGameData] = useState<any>({});
    
    const getGameData = async (gameid: string) => {
        const response = await fetch('http://localhost:5000/game/'+gameid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setGameData(data);
        return gameData;        
    }



    return (
        <GameDataContext.Provider value={{ gameData,getGameData }}>
            {children}
        </GameDataContext.Provider>
    );
}

export const useGameData = () => {
    const context = useContext(GameDataContext);
    return context;
}