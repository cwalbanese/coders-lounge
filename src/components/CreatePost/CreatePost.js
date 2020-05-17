import React from 'react';

function CreatePost(props) {
  if (props.username) {
    return (
      <div id="create-post">
        <h2>create post</h2>
        <p>{props.username}</p>
      </div>
    );
  }
  return (
    <div id="create-post">
      <h2>create post</h2>
      <p>anonymous</p>
    </div>
  );
}

export default CreatePost;
