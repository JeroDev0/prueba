import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Planes from './components/Planes';
import Contador from './components/Contador';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Planes</Link> | <Link to="/contador">Contador</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Planes />} />
        <Route path="/contador" element={<Contador />} />
      </Routes>
    </div>
  );
}

export default App;
