
import { useHistory, Link, useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from 'easy-peasy';

const PostPage = () => {

  const history = useHistory();
  const { id } = useParams();
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostById = useStoreState((state) => state.getPostById)
  const post = getPostById(id);

  const handleDelete = (id) => { //delete
    deletePost(id);
    history.push('/')
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