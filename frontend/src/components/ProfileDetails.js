import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfileDetails = () => {
  const { profileId } = useParams();
  const [groups, setGroups] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groupsRes, postsRes, commentsRes] = await Promise.all([
          axios.get(`http://localhost:5001/profile/${profileId}/groups`),
          axios.get(`http://localhost:5001/profile/${profileId}/posts`),
          axios.get(`http://localhost:5001/profile/${profileId}/comments`),
        ]);

        setGroups(groupsRes.data);
        setPosts(postsRes.data);
        setComments(commentsRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to fetch profile data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [profileId]);

  if (loading) {
    return <p>Loading profile details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Profile Details</h1>

      <h2>Groups</h2>
      {groups.length > 0 ? (
        <ul>
          {groups.map((group) => (
            <li key={group.g_id}>{group.g_name}</li>
          ))}
        </ul>
      ) : (
        <p>No groups found.</p>
      )}

      <h2>Posts</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.p_id}>
              <strong>{post.p_text}</strong>
              <p>{post.p_content}</p>
              <small>{new Date(post.p_date).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}

      <h2>Comments on Posts</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.c_id}>
              <p>{comment.p_content}</p>
              <small>Posted on {new Date(comment.c_date).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments found.</p>
      )}
    </div>
  );
};

export default ProfileDetails;
