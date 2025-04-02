import React from 'react';

interface MovieCardProps {
    title: string;
    image: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, image }) => {
    return (
        <div className="w-48 p-2 cursor-pointer transform hover:scale-105 transition duration-300">
            <img src={image} alt={title} className="rounded-lg shadow-lg" />
            <h3 className="text-white mt-2 text-center">{title}</h3>
        </div>
    );
};

export default MovieCard;
