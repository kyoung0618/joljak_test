// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import StudySessionPage from './pages/StudySessionPage';
import './App.css';
import FocusDetailPage from './pages/FocusDetailPage';
import axios from 'axios';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"           element={<LoginPage />} />
        <Route path="/register"   element={<RegisterPage />} />
        <Route path="/dashboard"  element={<DashboardPage />} />
        <Route path="/study"      element={<StudySessionPage />} />
        <Route path="/focus/:date" element={<FocusDetailPage />} />
      </Routes>
    </Router>
  );
}


export default App;