import React from 'react';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comment: '',
    };
  }

  fetchPosts = () => {
    fetch('http://localhost:8082/api/posts')
      .then((response) => response.json())
      .then((data) => this.setState({ posts: data }));
  };

  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    return (
      <div id="posts">
        <h2>posts</h2>
        {this.state.posts.reverse().map((result) => {
          return (
            <div key={result._id} className="results">
              <p className="post-item">"{result.post}"</p>
              <p className="posted-by">
                posted by: <span>{result.username}</span>
              </p>
              <p className="posted-on">
                posted on: <span>{result.time.slice(0, 10)}</span>
              </p>
              <p className="comments-title">comments:</p>
              <ul className="comments-list">
                {result.comments.map((comment) => {
                  return <li key={Date.now()}>{comment}</li>;
                })}
              </ul>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  let data = result.comments;
                  data.push(this.state.comment);
                  fetch(
                    'http://localhost:8082/api/posts/update/' + result._id,
                    {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      mode: 'cors',
                      body: JSON.stringify(data),
                    }
                  ).then(() => this.fetchPosts());
                }}
                type="submit"
              >
                <input
                  className="comment-input"
                  type="text"
                  placeholder="comment"
                  name="comment"
                  onChange={(evt) =>
                    this.setState({ comment: evt.target.value })
                  }
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
    );
  }
}

export default Posts;
