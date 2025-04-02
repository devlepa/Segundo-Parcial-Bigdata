import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid: React.FC = () => {
    const movies = [
        { title: "Zorro Ark", image: "https://image.tmdb.org/t/p/w500/6KErczPBROQty7QoIsaa6wJYXZi.jpg" },
        { title: "Zoombies", image: "https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg" },
        { title: "Avengers", image: "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg" },
        { title: "Black Panther", image: "https://image.tmdb.org/t/p/w500/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg" },
        { title: "Spider-Man", image: "https://image.tmdb.org/t/p/w500/5nRyaVklxyA9OkxqZaPv1KBRqpd.jpg" },
    ];

    return (
        <div className="grid grid-cols-5 gap-4 p-4">
            {movies.map((movie, index) => (
                <MovieCard key={index} title={movie.title} image={movie.image} />
            ))}
        </div>
    );
};

export default MovieGrid;
