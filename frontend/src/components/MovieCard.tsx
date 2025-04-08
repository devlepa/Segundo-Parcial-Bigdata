import React from "react";

interface MovieCardProps {
  title: string;
  description: string;
  image: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, description, image }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src="https://images.pexels.com/photos/799132/pexels-photo-799132.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default MovieCard;
