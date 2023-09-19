import React, { useEffect, useState } from "react";
import Post from "../../src/components/Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id}>
            <Post {...post} />
          </div>
        ))
      ) : (
        <div>
          <p>No post has been published yet.</p>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
