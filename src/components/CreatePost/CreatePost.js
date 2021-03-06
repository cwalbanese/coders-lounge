import React from 'react';

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
    };
  }

  onTextboxChangePost = (evt) => {
    this.setState({ post: evt.target.value });
  };

  createPost = (evt) => {
    evt.preventDefault();
    let data = {
      username: this.props.username,
      post: this.state.post,
    };
    fetch('https://coders-lounge-backend.herokuapp.com/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(data),
    })
      .then(() => this.setState({ post: '' }))
      .then(() => {
        this.props.fetchPosts();
      })
      .then(() => {
        window.location.replace(
          'https://coders-lounge-frontend.herokuapp.com/#posts'
        );
      });
  };

  render() {
    return (
      <div id="create-post">
        <h2>create post</h2>
        <form className="post-form" type="submit">
          <input
            className="post-input"
            type="text"
            placeholder="post"
            value={this.state.post}
            onChange={this.onTextboxChangePost}
          />
          <br />
          <a href="/">
            <button
              className="post-btn"
              onClick={this.createPost}
              onSubmit={this.createPost}
            >
              <span>post</span>
            </button>
          </a>
        </form>
      </div>
    );
  }
}

export default CreatePost;
