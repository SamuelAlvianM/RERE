import React, { Suspense } from 'react';
import { useGameContext } from '../context/GameContext';

const GameCard = React.lazy(() => import('../components/gameCard/GameCard'));

const GamesPage: React.FC = () => {
    const { games, loading, error } = useGameContext();

    if (loading) return <div>Loading games...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="bg-emerald-200 min-h-screen flex justify-center items-center p-6 hover:bg-emerald-300 transition-colors">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-screen-xl">
                <Suspense fallback={<div>Loading Game Cards...</div>}>
                    {games.map((game) => (
                        <GameCard
                            key={game.id}
                            title={game.title}
                            thumbnail={game.thumbnail}
                            genre={game.genre}
                            platform={game.platform}
                            description={game.short_description}
                        />
                    ))}
                </Suspense>
            </div>
        </div>
    );
};

export default GamesPage;
