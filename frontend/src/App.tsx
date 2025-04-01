import React from 'react';
import ActorsList from './components/ActorsList';
import AddActorForm from './components/AddActorForm';

const App = () => {
    return (
        <div className="App">
            <h1>Actors Management</h1>
            <AddActorForm />
            <ActorsList />
        </div>
    );
};

export default App;
