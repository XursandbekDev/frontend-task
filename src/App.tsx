import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/login';
import Admin from './pages/admin';
import Home from './pages/home';
import "./index.css"

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/add-product" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
