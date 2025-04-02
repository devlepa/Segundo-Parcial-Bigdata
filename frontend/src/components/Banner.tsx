import React from 'react';

const Banner: React.FC = () => {
    return (
        <div className="relative bg-cover bg-center h-[500px] text-white" 
            style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original/b6W4uKwgf4nN7eOqGKBzMnTbycV.jpg')` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute bottom-10 left-10">
                <h1 className="text-5xl font-bold">Featured Movie</h1>
                <p className="text-lg mt-2">This is an amazing movie description.</p>
                <button className="bg-red-600 py-2 px-4 rounded mt-4">Play</button>
            </div>
        </div>
    );
};

export default Banner;
