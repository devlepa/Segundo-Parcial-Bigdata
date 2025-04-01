import React, { useState } from 'react';
import ActorsList from './components/ActorsList';
import AddActorForm from './components/AddActorForm';
import './styles.css';

const App = () => {
    const [refresh, setRefresh] = useState(0);

    const handleRefresh = () => {
        setRefresh(refresh + 1);
    };

    return (
        <div className="container">
            <h1>Actors Management</h1>
            <AddActorForm onRefresh={handleRefresh} />
            <ActorsList onRefresh={refresh} />
        </div>
    );
};

export default App;
