import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RentMovies from "./pages/RentMovies";
import Actors from "./pages/Actors";
import FilmAvailability from "./pages/FilmAvailability";
import SearchMovies from "./pages/SearchMovies";
import "./styles.css";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<RentMovies />} />{" "}
          {/* Root points to RentMovies */}
          <Route path="/actors" element={<Actors />} />
          <Route path="/film-availability" element={<FilmAvailability />} />
          <Route path="/search-movies" element={<SearchMovies />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
