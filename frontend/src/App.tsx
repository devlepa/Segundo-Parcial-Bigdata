import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Actors from "./pages/Actors";
import FilmAvailability from "./pages/FilmAvailability";
import SearchMovies from "./pages/SearchMovies";
import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center text-white">
        <Navbar />
        <div className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="/film-availability" element={<FilmAvailability />} />
            <Route path="/search-movies" element={<SearchMovies />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
