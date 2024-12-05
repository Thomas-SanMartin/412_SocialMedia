import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetails = ({ loggedInProfileId }) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          axios.get(`http://localhost:5001/post/${postId}`),
          axios.get(`http://localhost:5001/post/${postId}/comments`),
        ]);
        setPost(postRes.data);
        setComments(commentsRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching post data:", err);
      }
    };
    fetchPostData();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5001/post/${postId}/comment`,
        { c_poster: loggedInProfileId, p_content: newComment }
      );
      const updatedComments = await axios.get(
        `http://localhost:5001/post/${postId}/comments`
      );
      setComments(updatedComments.data);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  if (loading) {
    return <p>Loading post details...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h1>{post.p_text}</h1>
        <p>{post.p_content}</p>
        <small className="text-muted">
          Posted on: {new Date(post.p_date).toLocaleString()}
        </small>
      </div>

      <div className="mb-5">
        <h2>Comments</h2>
        <ul className="list-group">
          {comments.map((comment) => (
            <li key={comment.c_id} className="list-group-item">
              <p>
                <strong>{comment.u_name}:</strong> {comment.p_content}
              </p>
              <small className="text-muted">
                Commented on {new Date(comment.c_date).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Add a Comment</h3>
        <form onSubmit={handleCommentSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostDetails;
