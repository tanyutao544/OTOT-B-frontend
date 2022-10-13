import ContactList from './components/ContactList';
import Create from './components/Create';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className='content'>
          <Routes>
            <Route exact path="/" element={<ContactList/>} />
            <Route path="/create" element={<Create/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
