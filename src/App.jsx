import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import Dashboard from './pages/Dashboard/Dashboard';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import './App.scss';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <BrowserRouter>
    <Navbar token={token} setToken={setToken}/>
    <Routes>
      <Route path='/' element={<HomePage token={token} />} />
      <Route path='/dashboard' element={<Dashboard token={token} />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login setToken={setToken} />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
