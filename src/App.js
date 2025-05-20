// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import StudySessionPage from './pages/StudySessionPage/StudySessionPage';
import FocusDetailPage from './pages/FocusDetailpage/FocusDetailPage';
import './App.css';
import StudyStartPage from './pages/StudyStartPage/StudyStartPage';
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
        <Route path="/study-start" element={<StudyStartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
