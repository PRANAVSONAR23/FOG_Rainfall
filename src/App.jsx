// src/App.js
import React from 'react';
import Grid from './Grid';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Grid rows={15} cols={20} />
    </div>
  );
};

export default App;
