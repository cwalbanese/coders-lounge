import React from 'react';
import { setInStorage, getFromStorage } from '../../utils/storage.js';
import LoginMessage from '../LoginMessage/LoginMessage';
import Login from '../Login/Login.js';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [].reverse(),
      comment: '',
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

  fetchPosts = () => {
    fetch('https://coders-lounge-backend.herokuapp.com/api/posts')
      .then((response) => response.json())
      .then((data) => this.setState({ posts: data }));
  };

  componentDidMount() {
    this.fetchPosts();
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

  onSignUp(evt) {
    evt.preventDefault();
    const { signUpUsername, signUpPassword } = this.state;

    fetch('https://coders-lounge-backend.herokuapp.com/api/users/signup', {
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
        if (json.success) {
          this.setState({
            signUpError: json.message,
            signUpUsername: '',
            signUpPassword: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
          });
        }
      });
  }

  onSignIn(evt) {
    evt.preventDefault();
    const { signInUsername, signInPassword } = this.state;
    fetch('https://coders-lounge-backend.herokuapp.com/api/users/login', {
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
          setInStorage('coders-lounge', {
            token: json.token,
            username: signInUsername,
          });
          this.forceUpdate();
          this.setState({ username: signInUsername });
          this.setState({
            signInError: json.message,
            signInPassword: '',
            signInUsername: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
          });
        }
      });
  }

  logout() {
    const obj = getFromStorage('coders-lounge');
    if (obj && obj.token) {
      const { token } = obj;
      fetch(
        'https://coders-lounge-backend.herokuapp.com/api/users/logout?token=' +
          token
      ).then(() => {
        this.setState({
          token: '',
          username: 'anonymous',
          signUpError: '',
          signInError: '',
        });
        setInStorage('coders-lounge', {
          token: '',
          username: 'anonymous',
        });
      });
    }
  }

  clearForm = () => {
    this.myFormRef.reset();
  };

  keyGen = () => {
    return (
      this.keyGenHelper() +
      this.keyGenHelper() +
      '-' +
      this.keyGenHelper() +
      '-' +
      this.keyGenHelper() +
      '-' +
      this.keyGenHelper() +
      '-' +
      this.keyGenHelper() +
      this.keyGenHelper() +
      this.keyGenHelper()
    );
  };
  keyGenHelper = () => {
    return Math.floor((1 + Math.random()) * 10000)
      .toString(16)
      .substring(1);
  };

  render() {
    return (
      <div>
        <div id="posts">
          <h2>posts</h2>
          {this.state.posts.map((result) => {
            return (
              <div key={result._id} className="results">
                <p className="post-item">"{result.post}"</p>
                <div className="posted">
                  {' '}
                  <p className="posted-by">
                    posted by: <span>{result.username}</span>
                  </p>
                  <p className="posted-on">
                    posted on: <span>{result.time.slice(0, 10)}</span>
                  </p>
                  <p className="rating">
                    likes: <span>{result.rating}</span>
                  </p>
                  <img
                    className="thumb"
                    src="/images/thumb.svg"
                    alt="thumb"
                    onClick={() => {
                      let rate = [result.rating + 1];

                      fetch(
                        'https://coders-lounge-backend.herokuapp.com/api/posts/update/rating/' +
                          result._id,
                        {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          mode: 'cors',
                          body: JSON.stringify(rate),
                        }
                      ).then(() => this.fetchPosts());
                    }}
                  ></img>
                  <img
                    className="thumb thumb-down"
                    src="/images/thumb.svg"
                    alt="thumb"
                    onClick={() => {
                      let rate = [result.rating - 1];

                      fetch(
                        'https://coders-lounge-backend.herokuapp.com/api/posts/update/rating/' +
                          result._id,
                        {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          mode: 'cors',
                          body: JSON.stringify(rate),
                        }
                      ).then(() => this.fetchPosts());
                    }}
                  ></img>
                </div>

                <p className="comments-title">comments:</p>
                <div className="comments-list">
                  {' '}
                  <ul>
                    {result.comments.map((comment) => {
                      let key = this.keyGen();
                      return <li key={key}>&#8226; {comment}</li>;
                    })}
                  </ul>
                </div>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    let data = result.comments;
                    data.push(this.state.comment);
                    fetch(
                      'https://coders-lounge-backend.herokuapp.com/api/posts/update/' +
                        result._id,
                      {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        mode: 'cors',
                        body: JSON.stringify(data),
                      }
                    )
                      .then(() => this.fetchPosts())
                      .then(() => {
                        this.setState({ comment: '' });
                      });
                  }}
                  type="submit"
                >
                  <input
                    className="comment-input"
                    type="text"
                    placeholder="comment"
                    name="comment"
                    onChange={(evt) => {
                      evt.preventDefault();
                      this.setState({ comment: evt.target.value });
                    }}
                  ></input>
                  <br />
                  <button>
                    <span>add comment</span>
                  </button>
                </form>
              </div>
            );
          })}
        </div>
        <div>
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
            username={this.state.username}
            fetchPosts={this.fetchPosts}
          />
        </div>
      </div>
    );
  }
}

export default Posts;
