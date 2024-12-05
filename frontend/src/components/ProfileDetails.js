import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProfileDetails = ({ loggedInProfileId, loggedInProfileName }) => {
  const { profileId } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [availableGroups, setAvailableGroups] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ p_text: "", p_content: "" });
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [errorGroups, setErrorGroups] = useState(null);
  const [errorPosts, setErrorPosts] = useState(null);

  useEffect(() => {
    setIsOwner(parseInt(profileId) === loggedInProfileId);
  }, [profileId, loggedInProfileId]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const [joinedGroupsRes, allGroupsRes] = await Promise.all([
          axios.get(`http://localhost:5001/profile/${profileId}/groups`),
          axios.get("http://localhost:5001/groups"),
        ]);

        const joinedGroupIds = joinedGroupsRes.data.map((group) => group.g_id);
        const unjoinedGroups = allGroupsRes.data.filter(
          (group) => !joinedGroupIds.includes(group.g_id)
        );

        setJoinedGroups(joinedGroupsRes.data);
        setAvailableGroups(unjoinedGroups);
        setLoadingGroups(false);
      } catch (err) {
        console.error("Error fetching groups:", err);
        setErrorGroups("Failed to fetch groups. Please try again later.");
        setLoadingGroups(false);
      }
    };

    fetchGroups();
  }, [profileId]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRes = await axios.get(
          `http://localhost:5001/profile/${profileId}/posts`
        );
        setPosts(postsRes.data);
        setLoadingPosts(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setErrorPosts("Failed to fetch posts. Please try again later.");
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [profileId]);

  const handleGroupSelect = (e) => {
    setSelectedGroupId(e.target.value);
  };

  const handleJoinGroup = async () => {
    if (!selectedGroupId) {
      alert("Please select a group to join.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5001/groups/${selectedGroupId}/join`,
        { profileId: loggedInProfileId }
      );

      const joinedGroupsRes = await axios.get(
        `http://localhost:5001/profile/${profileId}/groups`
      );
      const joinedGroupIds = joinedGroupsRes.data.map((group) => group.g_id);
      const updatedAvailableGroups = availableGroups.filter(
        (group) => !joinedGroupIds.includes(group.g_id)
      );

      setJoinedGroups(joinedGroupsRes.data);
      setAvailableGroups(updatedAvailableGroups);
      setSelectedGroupId("");
      alert("Successfully joined the group!");
    } catch (err) {
      console.error("Error joining group:", err);
      alert("Failed to join group. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!newPost.p_text || !newPost.p_content) {
      alert("Post title and content are required.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5001/profile/${loggedInProfileId}/posts`,
        newPost
      );
      setPosts([...posts, response.data]);
      setNewPost({ p_text: "", p_content: "" });
      alert("Post created successfully!");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      {/* Profile Header */}
      <div className="text-center mb-4">
        <h1>{loggedInProfileName || "Profile Details"}</h1>
        <p className="text-muted">
          {isOwner ? "Your Profile" : `Viewing Profile ID: ${profileId}`}
        </p>
      </div>

      {/* Groups Section */}
      <div className="mb-5">
        <h2>Groups</h2>
        {loadingGroups ? (
          <p>Loading groups...</p>
        ) : errorGroups ? (
          <p className="text-danger">{errorGroups}</p>
        ) : (
          <ul className="list-group">
            {joinedGroups.map((group) => (
              <li
                key={group.g_id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <Link to={`/groups/${group.g_id}`} className="text-decoration-none">
                  {group.g_name}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Join Group Section */}
        {isOwner && (
          <div className="mt-4">
            <h3>Join a Group</h3>
            <div className="d-flex">
              <select
                className="form-select me-2"
                onChange={handleGroupSelect}
                value={selectedGroupId}
              >
                <option value="">-- Select a Group --</option>
                {availableGroups.map((group) => (
                  <option key={group.g_id} value={group.g_id}>
                    {group.g_name}
                  </option>
                ))}
              </select>
              <button className="btn btn-primary" onClick={handleJoinGroup}>
                Join Group
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Posts Section */}
      <div className="mb-5">
        <h2>Posts</h2>
        {loadingPosts ? (
          <p>Loading posts...</p>
        ) : errorPosts ? (
          <p className="text-danger">{errorPosts}</p>
        ) : (
          <ul className="list-group">
            {posts.map((post) => (
              <li
                key={post.p_id}
                className="list-group-item d-flex justify-content-between align-items-start"
              >
                <div>
                  <strong>
                    <Link
                      to={`/posts/${post.p_id}`}
                      className="text-decoration-none"
                    >
                      {post.p_text}
                    </Link>
                  </strong>
                  <p className="mb-0">{post.p_content}</p>
                  <small className="text-muted">
                    {new Date(post.p_date).toLocaleString()}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Create Post Section */}
        {isOwner && (
          <div className="mt-4">
            <h3>Create a New Post</h3>
            <form onSubmit={handleCreatePost}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="p_text"
                  placeholder="Post Title"
                  value={newPost.p_text}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  name="p_content"
                  placeholder="Post Content"
                  value={newPost.p_content}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">
                Create Post
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
