import React from 'react';
import './App.css';
import Header from './components/Header/Header.js';
import About from './components/About/About.js';
import Nav from './components/Nav/Nav.js';
import Posts from './components/Posts/Posts.js';
import PostsMessage from './components/PostsMessage/PostsMessage.js';
import CreateMessage from './components/CreateMessage/CreateMessage.js';
import CreatePost from './components/CreatePost/CreatePost.js';
import LoginMessage from './components/LoginMessage/LoginMessage';
import Login from './components/Login/Login.js';
import Footer from './components/Footer/Footer.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loggedIn: false,
      loggedOut: true,
      username: 'anonymous',
    };
  }

  handleLogin = (evt, data) => {
    evt.preventDefault();
    fetch('http://localhost:8082/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem('token', json.token);
        this.setState({ loggedIn: true });
        this.setState({ loggedOut: false });
        this.setState({ username: json.username });
      });
  };

  componentDidMount() {
    fetch('http://localhost:8082/api/posts')
      .then((response) => response.json())
      .then((data) => this.setState({ posts: data }));
  }

  render() {
    return (
      <div>
        <Nav username={this.state.username} />
        <Header />
        <About />
        <PostsMessage />
        <Posts posts={this.state.posts} />
        <CreateMessage />
        <CreatePost />
        <LoginMessage />
        <Login handleLogin={this.handleLogin} />
        <Footer />
      </div>
    );
  }
}

export default App;
