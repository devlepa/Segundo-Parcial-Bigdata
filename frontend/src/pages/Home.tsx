import React from 'react';
import Banner from '../components/Banner';
import MovieGrid from '../components/MovieGrid';

const Home: React.FC = () => {
    return (
        <div>
            <Banner />
            <MovieGrid />
        </div>
    );
};

export default Home;
