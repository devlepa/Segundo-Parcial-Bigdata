import React from 'react';
import './styles.css';
import ActorsList from './components/ActorsList';
import AddActorForm from './components/AddActorForm';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>Actors Management</h1>
      <AddActorForm />
      <ActorsList />
    </div>
  );
}

export default App;
