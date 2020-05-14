import React from 'react';

function Posts(props) {
  let posts = props.posts;
  return (
    <div id="posts">
      <h2>posts</h2>
      {posts.map((result) => (
        <div key={result._id} className="results">
          <p>{result.post}</p>
          <p className="posted-by">Posted By: {result.username}</p>
        </div>
      ))}
    </div>
  );
}

export default Posts;
