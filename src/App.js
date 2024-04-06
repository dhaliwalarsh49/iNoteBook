import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './contexts/notes/NoteState';
import AlertState from './contexts/alerts/AlertState';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Showalert from './components/Showalert';
import Profile from './components/Profile';

function App() {
  return (
    <>
      <NoteState>
        <AlertState>
          <Router>
            <Navbar />
            <Showalert/>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<Signup />} />
              <Route exact path='/profile' element={<Profile />} />
            </Routes>
          </Router>
        </AlertState>
      </NoteState>
    </>
  );
}

export default App;
