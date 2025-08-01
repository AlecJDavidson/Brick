import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import BrickTable from './components/BrickTable';
import BrickDetails from './components/BrickDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BrickTable />} />
        <Route path="/brick-details/:brickId" element={<BrickDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
