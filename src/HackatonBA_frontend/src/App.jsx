import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Services from '../src/pages/Services';
import Comments from '../src/pages/Comments';
import History from '../src/pages/History';

function App() {

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
            <Link to="/services">Servicios</Link>
            </li>
            <li>
            <Link to="/comments">Comentarios</Link>
            </li>
            <li>
            <Link to="/history">Historial</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
