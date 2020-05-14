import React from 'react';

function Login(props) {
  return (
    <div id="login">
      <h2>login or signup</h2>
      <form>
        <label>Username:</label>
        <br />
        <input type="text" id="username" name="username"></input>
        <br />
        <label>Password:</label>
        <br />
        <input type="password" id="password" name="password"></input>
        <br />
        <button type="submit" onClick={props.handleLogin}>
          Login
        </button>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Login;
