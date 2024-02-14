//import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header';
import { AddEdit } from './pages/addedit/AddEdit';
import { Home } from './pages/home/Home';
import { Routes, Route } from 'react-router-dom';
import {BrowserRouter as Router} from "react-router-dom";
import { Chat } from './pages/chat/Chat';

function App() {
  return (
    <Router>
      <Header></Header>
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/add" element={<AddEdit/>} />
          <Route path="/update/:id" element={<AddEdit/>} />
          <Route path="/chat" element={<Chat/>} />

          </Routes>
      </div>
      {/* <Home></Home> */}
    </Router>
  );
}

export default App;
//        <Route path="/add" element={<AddEdit/>} />
