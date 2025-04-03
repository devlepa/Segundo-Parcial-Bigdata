import React from "react";

interface MovieCardProps {
  title: string;
  image: string;
  details?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, image, details }) => {
  return (
    <div className="w-48 p-2 bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
      <img src={image} alt={title} className="rounded-lg mb-2" />
      <h3 className="text-white text-center text-lg font-bold">{title}</h3>
      {details && (
        <p className="text-gray-400 text-sm text-center mt-2">{details}</p>
      )}
    </div>
  );
};

export default MovieCard;
