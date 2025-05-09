import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import CelestialBody from './pages/CelestialBody';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/celestial/:id" element={<CelestialBody />} />
        </Routes>
      </Router>
    </>
  );
}

export default App; 