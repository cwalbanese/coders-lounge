import React from 'react';

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

  render() {
    if (!this.state.token) {
      return (
        <div id="login" className="white-background login">
          <div>
            {this.state.signInError ? <h2>{this.state.signInError}</h2> : null}
            <h2 className="login-title">login</h2>
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
            <button className="login-btn" onClick={this.state.onSignIn}>
              Login
            </button>
          </div>
          <br />
          <br />
          <div>
            {this.state.signUpError ? <h2>{this.state.signUpError}</h2> : null}
            <h2 className="signup-title">signup</h2>
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
            <button className="signup-btn" onClick={this.state.onSignUp}>
              Signup
            </button>
          </div>
        </div>
      );
    }
    return (
      <div id="logout" className="white-background loggedin">
        <div>
          <h2 className="login-title">logged in</h2>
          <button className="logout-btn" onClick={this.state.logout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
