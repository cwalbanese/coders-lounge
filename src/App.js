import React from 'react';
import './App.css';
import Header from './components/Header/Header.js';
import About from './components/About/About.js';
import Nav from './components/Nav/Nav.js';

function App() {
  return (
    <div>
      <Nav />
      <Header />
      <About />
    </div>
  );
}

export default App;
