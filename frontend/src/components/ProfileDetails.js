import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProfileDetails = ({ loggedInProfileId, loggedInProfileName }) => {
  const { profileId } = useParams();
  const [groups, setGroups] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groupsRes, postsRes] = await Promise.all([
          axios.get(`http://localhost:5001/profile/${profileId}/groups`),
          axios.get(`http://localhost:5001/profile/${profileId}/posts`),
        ]);
        setGroups(groupsRes.data);
        setPosts(postsRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to fetch profile data. Please try again later.");
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
      {/* Display logged-in profile info 
      <p>Logged in as: {loggedInProfileName || 'Unknown Profile'} (Profile ID: {loggedInProfileId})</p> */}

      <h1>Profile Details</h1>

      <h2>Groups</h2>
      {groups.length > 0 ? (
        <ul>
          {groups.map((group) => (
            <li key={group.g_id}>
              <Link to={`/groups/${group.g_id}`}>{group.g_name}</Link>
            </li>
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
              <strong>
                <Link to={`/posts/${post.p_id}`}>{post.p_text}</Link>
              </strong>
              <p>{post.p_content}</p>
              <small>{new Date(post.p_date).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default ProfileDetails;
