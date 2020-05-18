import React from 'react';
import './App.css';
import Header from './components/Header/Header.js';
import About from './components/About/About.js';
import Nav from './components/Nav/Nav.js';
import Posts from './components/Posts/Posts.js';
import PostsMessage from './components/PostsMessage/PostsMessage.js';

import Footer from './components/Footer/Footer.js';

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <Header />
        <About />
        <PostsMessage />
        <Posts />
        <Footer />
      </div>
    );
  }
}

export default App;
