import './App.css';
import ContactList from './components/ContactList';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="title">My Contacts</h1>
        <ContactList />
      </div>
    </div>
  );
}

export default App;
