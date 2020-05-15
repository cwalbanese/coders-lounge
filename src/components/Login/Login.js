import React from 'react';
import { setInStorage, getFromStorage } from '../../utils/storage.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

    this.onTextboxChangeSignInUsername = this.onTextboxChangeSignInUsername.bind(
      this
    );
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(
      this
    );
    this.onTextboxChangeSignUpUsername = this.onTextboxChangeSignUpUsername.bind(
      this
    );
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(
      this
    );

    this.onSignUp = this.onSignUp.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('coders-lounge');
    if (obj && obj.token) {
      const { token } = obj;

      fetch(
        'http://localhost:8082/api/users/verify?token=' + token
      ).then((res) => res.json());
    }
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
        console.log('json', json);
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
    const {
      token,
      signInError,
      signInUsername,
      signInPassword,
      signUpUsername,
      signUpPassword,
      signUpError,
    } = this.state;

    if (!token) {
      return (
        <div className="white-background">
          <div>
            {signInError ? <h2>{signInError}</h2> : null}
            <h2>login</h2>
            <input
              type="username"
              placeholder="Username"
              value={signInUsername}
              onChange={this.onTextboxChangeSignInUsername}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
            <br />
            <button onClick={this.onSignIn}>Login</button>
          </div>
          <br />
          <br />
          <div>
            {signUpError ? <h2>{signUpError}</h2> : null}
            <h2>signup</h2>
            <input
              type="username"
              placeholder="Username"
              value={signUpUsername}
              onChange={this.onTextboxChangeSignUpUsername}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            />
            <br />
            <button onClick={this.onSignUp}>Signup</button>
          </div>
        </div>
      );
    }
    return (
      <div className="white-background">
        <h2>logged in</h2>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Login;
