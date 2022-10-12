import ContactList from './components/ContactList';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className='content'>
        <ContactList />
      </div>
    </div>
  );
}

export default App;
