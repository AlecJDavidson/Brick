import React from 'react';
import './App.css';
import BrickTable from './components/BrickTable';

const App: React.FC = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Brick Table</h1>
        <BrickTable />
      </header>
    </div>
  );
};

export default App;
