import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchGames } from '../services/api';

interface Game {
id: number;
title: string;
thumbnail: string;
short_description: string;
genre: string;
platform: string;
}

interface GameContextType {
games: Game[];
loading: boolean;
error: string | null;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
const [games, setGames] = useState<Game[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
    const fetchData = async () => {
    try {
        const data = await fetchGames();
        setGames(data);
    } catch (err) {
        setError('Failed to fetch games. Please try again later.');
        console.error('Error fetching games:', err);
    } finally {
        setLoading(false);
    }
    };

    fetchData();
}, []);

return (
    <GameContext.Provider value={{ games, loading, error }}>
    {children}
    </GameContext.Provider>
);
};

export const useGameContext = (): GameContextType => {
const context = useContext(GameContext);
if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
}
return context;
};
