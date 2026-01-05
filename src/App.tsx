import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <Sidebar />
        <Canvas />
      </div>
    </div>
  );
}

export default App;
