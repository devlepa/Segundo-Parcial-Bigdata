import ActorForm from './components/ActorForm';
import ActorList from './components/ActorList';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Gestión de Actores - Sakila</h1>
      <ActorForm />
      <ActorList />
    </div>
  );
}

export default App;
