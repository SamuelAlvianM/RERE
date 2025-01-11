import React from 'react';
import LazyLoad from 'react-lazyload';
import { useNavigate } from "react-router-dom";

interface GameCardProps {
    title: string;
    thumbnail: string;
    genre: string;
    platform: string;
    description: string;
}

const GameCard: React.FC<GameCardProps> = ({ title, thumbnail, genre, platform, description }) => {
        const navigate = useNavigate();

        const back = () => {
            navigate("/products");
        };

    return (
        <LazyLoad height={200} offset={100} once>
            <button
                onClick={() => back()}
                className="fixed top-6 left-1/2 transform -translate-x-1/2 p-4  bg-red-500 border-2 text-white font-bold rounded-full hover:bg-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-stone-500 transition-all duration-300 hover:ring-8 hover:ring-violet-300"
            >
                Back to products
            </button>
            <div className="bg-yellow-200 rounded-lg shadow-md overflow-hidden p-4 hover:shadow-xl transition-shadow">
                <img src={thumbnail} alt={title} className="w-full h-40 object-cover rounded" />
                <h3 className="text-lg font-bold mt-2">{title}</h3>
                <p className="text-sm text-gray-600">{genre} | {platform}</p>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
        </LazyLoad>
    );
};

export default GameCard;
