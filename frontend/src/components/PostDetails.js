import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetails = ({ loggedInProfileId }) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
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
        console.error('Error fetching post data:', err);
      }
    };
    fetchPostData();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5001/post/${postId}/comment`,
        { c_poster: loggedInProfileId, p_content: newComment }
      );
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  if (loading) {
    return <p>Loading post details...</p>;
  }

  return (
    <div>
      <h1>{post.p_text}</h1>
      <p>{post.p_content}</p>
      <small>Posted on: {new Date(post.p_date).toLocaleString()}</small>

      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.c_id}>
            <p>{comment.p_content}</p>
            <small>
              Commented on {new Date(comment.c_date).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>

      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          required
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default PostDetails;
