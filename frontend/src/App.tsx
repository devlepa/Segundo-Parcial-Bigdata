import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ActorsList from './components/ActorsList';
import AddActorForm from './components/AddActorForm';
import AddRentalForm from './components/AddRentalForm';
import Home from './components/Home';
import FilmAvailability from './components/FilmAvailability';
import './styles.css';

const App = () => {
    return (
        <Router>
            <div className="bg-gray-900 min-h-screen text-white">
                <nav className="bg-black p-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-red-600">My Netflix Clone</h1>
                    <ul className="flex space-x-4">
                        <li><Link to="/" className="hover:text-red-500">Home</Link></li>
                        <li><Link to="/actors" className="hover:text-red-500">Actors List</Link></li>
                        <li><Link to="/add-actor" className="hover:text-red-500">Add Actor</Link></li>
                        <li><Link to="/rental" className="hover:text-red-500">Add Rental</Link></li>
                        <li><Link to="/film-availability" className="hover:text-red-500">Check Availability</Link></li>
                    </ul>
                </nav>
                <div className="p-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/actors" element={<ActorsList />} />
                        <Route path="/add-actor" element={<AddActorForm />} />
                        <Route path="/rental" element={<AddRentalForm />} />
                        <Route path="/film-availability" element={<FilmAvailability />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
