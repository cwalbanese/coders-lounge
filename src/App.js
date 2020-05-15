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
import { setInStorage, getFromStorage } from './utils/storage.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInUsername: '',
      signInPassword: '',
      signUpUsername: '',
      signUpPassword: '',
      username: 'anonymous',
    };
  }

  componentDidMount() {
    fetch('http://localhost:8082/api/posts')
      .then((response) => response.json())
      .then((data) => this.setState({ posts: data }));
  }

  onTextboxChangeSignInUsername(event) {
    this.setState({
      signInUsername: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpUsername(event) {
    this.setState({
      signUpUsername: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp() {
    const { signUpUsername, signUpPassword } = this.state;
    this.setState({
      isLoading: true,
    });

    fetch('http://localhost:8082/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpUsername: '',
            signUpPassword: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  onSignIn() {
    const { signInUsername, signInPassword } = this.state;
    this.setState({
      isLoading: true,
    });

    fetch('http://localhost:8082/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setInStorage('coders-lounge', { token: json.token });
          this.setState({ username: signInUsername });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInUsername: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  logout() {
    const obj = getFromStorage('coders-lounge');
    if (obj && obj.token) {
      const { token } = obj;

      fetch('http://localhost:8082/api/users/logout?token=' + token)
        .then((res) => res.json())
        .then(() => {
          this.setState({
            token: '',
            username: 'anonymous',
          });
        });
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <Header />
        <About />
        <PostsMessage />
        <Posts posts={this.state.posts} />
        <LoginMessage />
        <Login
          onTextboxChangeSignInUsername={this.onTextboxChangeSignInUsername}
          onTextboxChangeSignInPassword={this.onTextboxChangeSignInPassword}
          onTextboxChangeSignUpUsername={this.onTextboxChangeSignUpUsername}
          onTextboxChangeSignUpPassword={this.onTextboxChangeSignUpPassword}
          token={this.state.token}
          signInError={this.state.signInError}
          signInUsername={this.state.signInUsername}
          signInPassword={this.state.signInPassword}
          signUpUsername={this.state.signUpUsername}
          signUpPassword={this.state.signUpPassword}
          signUpError={this.state.signUpError}
          onSignUp={this.onSignUp}
          onSignIn={this.onSignIn}
          logout={this.logout}
        />
        <CreateMessage />
        <CreatePost username={this.state.username} />
        <Footer />
      </div>
    );
  }
}

export default App;
