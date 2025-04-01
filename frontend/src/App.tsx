import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActorsList from './components/ActorsList';
import AddActorForm from './components/AddActorForm';
import Home from './components/Home';
import './styles.css';

const App = () => {
    return (
        <Router>
            <div className="container">
                <h1>Actors Management</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/actors">Actors List</Link></li>
                        <li><Link to="/add-actor">Add Actor</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/actors" element={<ActorsList />} />
                    <Route path="/add-actor" element={<AddActorForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;