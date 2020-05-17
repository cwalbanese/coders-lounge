import React from 'react';

function Posts(props) {
  let posts = props.posts;
  return (
    <div id="posts">
      <h2>posts</h2>
      {posts.reverse().map((result) => (
        <div key={result._id} className="results">
          <p>{result.post}</p>
          <p className="posted-by">
            posted by: <span>{result.username}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Posts;
