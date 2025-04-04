import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
        {/* Redirect root path to /rent-movies */}
        <Route path="/" element={<Navigate to="/rent-movies" replace />} />
        <Route
          path="/rent-movies"
          element={
            <Layout>
              <RentMovies />
            </Layout>
          }
        />
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
