import React, { useContext } from 'react'
import { useHistory, Link, useParams } from "react-router-dom";
import api from './api/posts'
import DataContext from './context/DataContext';

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const history = useHistory();

  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);

  const handleDelete = async (id) => { //delete
    try {
      await api.delete(`/posts/${id}`)
      const postList = posts.filter(post => post.id !== id);
      setPosts(postList);
      history.push('/');
    } catch (err) {
      console.log(`Error: ${err.message}`)

    }
  }
  return (
    <main className="PostPage">
      <article className="post">

        {post &&
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="portBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
            <button className="deleteButton" onClick={() => handleDelete(post.id)}>Delete</button>
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