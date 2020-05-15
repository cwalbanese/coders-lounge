import React from 'react';
import { getFromStorage } from '../../utils/storage.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token,
      signInError: props.signInError,
      signInUsername: props.signInUsername,
      signInPassword: props.signInPassword,
      signUpUsername: props.signInUsername,
      signUpPassword: props.signUpPassword,
      signUpError: props.signUpError,
      onTextboxChangeSignInUsername: props.onTextboxChangeSignInUsername,
      onTextboxChangeSignInPassword: props.onTextboxChangeSignInPassword,
      onTextboxChangeSignUpUsername: props.onTextboxChangeSignUpUsername,
      onTextboxChangeSignUpPassword: props.onTextboxChangeSignUpPassword,
      onSignUp: props.onSignUp,
      onSignIn: props.onSignIn,
      logout: props.logout,
    };
    this.state.onTextboxChangeSignInUsername = this.state.onTextboxChangeSignInUsername.bind(
      this
    );
    this.state.onTextboxChangeSignInPassword = this.state.onTextboxChangeSignInPassword.bind(
      this
    );
    this.state.onTextboxChangeSignUpUsername = this.state.onTextboxChangeSignUpUsername.bind(
      this
    );
    this.state.onTextboxChangeSignUpPassword = this.state.onTextboxChangeSignUpPassword.bind(
      this
    );

    this.state.onSignUp = this.state.onSignUp.bind(this);
    this.state.onSignIn = this.state.onSignIn.bind(this);
    this.state.logout = this.state.logout.bind(this);
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

  render() {
    if (!this.state.token) {
      return (
        <div className="white-background">
          <div>
            {this.state.signInError ? <h2>{this.state.signInError}</h2> : null}
            <h2>login</h2>
            <input
              type="username"
              placeholder="Username"
              value={this.state.signInUsername}
              onChange={this.state.onTextboxChangeSignInUsername}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={this.state.signInPassword}
              onChange={this.state.onTextboxChangeSignInPassword}
            />
            <br />
            <button onClick={this.state.onSignIn}>Login</button>
          </div>
          <br />
          <br />
          <div>
            {this.state.signUpError ? <h2>{this.state.signUpError}</h2> : null}
            <h2>signup</h2>
            <input
              type="username"
              placeholder="Username"
              value={this.state.signUpUsername}
              onChange={this.state.onTextboxChangeSignUpUsername}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={this.state.signUpPassword}
              onChange={this.state.onTextboxChangeSignUpPassword}
            />
            <br />
            <button onClick={this.state.onSignUp}>Signup</button>
          </div>
        </div>
      );
    }
    return (
      <div className="white-background">
        <h2>logged in</h2>
        <button onClick={this.state.logout}>Logout</button>
      </div>
    );
  }
}

export default Login;
