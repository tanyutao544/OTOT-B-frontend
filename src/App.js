import './App.css';
import 'bulma/css/bulma.min.css'
import ContactList from './components/ContactList';


function App() {
  return (
    <div className="App">
      <div className="container">
        <div className='column'>
          <h1 className='title'>My Contacts</h1>
          <ContactList />
        </div>
      </div>
    </div>
  );
}

export default App;
