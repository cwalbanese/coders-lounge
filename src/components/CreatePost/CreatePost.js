import React from 'react';

function CreatePost(props) {
  return (
    <div id="create-post">
      <h2>create post</h2>
      <p>{props.username}</p>
    </div>
  );
}

export default CreatePost;
