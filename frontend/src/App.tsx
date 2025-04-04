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
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <RentMovies />
            </Layout>
          }
        />{" "}
        {/* Root points to RentMovies */}
        <Route
          path="/actors"
          element={
            <Layout>
              <Actors />
            </Layout>
          }
        />
        <Route
          path="/film-availability"
          element={
            <Layout>
              <FilmAvailability />
            </Layout>
          }
        />
        <Route
          path="/search-movies"
          element={
            <Layout>
              <SearchMovies />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
