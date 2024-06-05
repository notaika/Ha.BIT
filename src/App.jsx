import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import Dashboard from './pages/Dashboard/Dashboard';
import SignUp from './pages/SignUp/SignUp';
import './App.scss'

function App() {
  //API call will be here 
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/logib' element={<Dashboard />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
