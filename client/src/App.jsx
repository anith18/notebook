import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from "./context/notes/NoteState"
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import {useState} from 'react'; 
// import About from './components/About';

function App() {
  const [alert,setalert]=useState(null);
  const showalert=(message,type)=>{
    setalert({
    msg:message,
    type: type
  })
  setTimeout(() => {  
    setalert(null);
  }, 3000);
}
  return (
    <NoteState>
    <Router>
      <Navbar />
      <Alert alert={alert}/>
      <div className='container'>
      <Routes>
        <Route path="/" element={<Home showalert={showalert} />} />
        <Route path="/about" element={<About showalert={showalert}/> } />
        <Route path="/login" element={<Login showalert={showalert}/> } />
        <Route path="/signup" element={<Signup showalert={showalert}/> } />
      </Routes>
      </div>
    </Router>
    </NoteState>
  );
}

export default App;