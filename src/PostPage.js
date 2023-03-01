import React from 'react'
import { userParams, Link, useParams } from "react-router-dom";

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  return (
    <main className="PostPage">
      <article className="post">

        {post &&
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="portBody">{post.body}</p>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </>
        }
        {!post &&
        <>
          <h2>Post Not Found</h2>
          <p>Well, that is disappointing.</p>
          <p>
            <Link to='/'>Visit our home page</Link>
          </p>
        </>
        }
      </article>
    </main>
  )
}

export default PostPage