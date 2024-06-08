import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import Dashboard from './pages/Dashboard/Dashboard';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Footer from './components/Footer/Footer';
import './App.scss';
import SupportPage from './pages/SupportPage/SupportPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <BrowserRouter>
    <Navbar token={token} setToken={setToken}/>
    <Routes>
      <Route path='/' element={<HomePage token={token} />} />
      <Route path='/dashboard' element={<Dashboard token={token} />} />
      <Route path='/support' element={<SupportPage />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login setToken={setToken} />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App
