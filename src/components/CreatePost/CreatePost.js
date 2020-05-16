import React, { Component } from 'react';

class CreatePost extends Component {
  render() {
    return (
      <div id="create-post">
        <h2>create post</h2>
        <p>{this.props.username}</p>
      </div>
    );
  }
}

export default CreatePost;
