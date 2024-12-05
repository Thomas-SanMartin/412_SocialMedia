import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfileSelection = ({ onProfileSelect }) => {
  const { userId } = useParams();
  const [profiles, setProfiles] = useState([]);
  const [userName, setUserName] = useState(""); // State for the user's name
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProfile, setNewProfile] = useState({
    p_name: "",
    p_email: "",
    p_username: "",
    p_password: "",
  });

  useEffect(() => {
    const fetchUserAndProfiles = async () => {
      try {
        // Fetch user details
        const userResponse = await axios.get(`http://localhost:5001/users/${userId}`);
        setUserName(userResponse.data.u_name);

        // Fetch profiles for the user
        const profilesResponse = await axios.get(`http://localhost:5001/profiles/${userId}`);
        setProfiles(profilesResponse.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching user or profiles:", err);
        setError("Failed to fetch user or profiles. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserAndProfiles();
  }, [userId]);

  const handleProfileSelect = (profileId, profileName) => {
    onProfileSelect(profileId, profileName); // Pass both to App.js
  };

  const handleInputChange = (e) => {
    setNewProfile({
      ...newProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateProfile = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/profiles", {
        ...newProfile,
        u_id: userId,
      })
      .then((response) => {
        setProfiles([...profiles, response.data]);
        setNewProfile({
          p_name: "",
          p_email: "",
          p_username: "",
          p_password: "",
        });
      })
      .catch((err) => {
        console.error("Error creating profile:", err);
        alert("Failed to create profile. Please try again.");
      });
  };

  if (loading) {
    return <p className="text-center">Loading profiles...</p>;
  }

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h1 className="text-center mb-4">Profiles for {userName}</h1>
        {profiles.length > 0 ? (
          <div className="form-group">
            <label htmlFor="profileSelect">Select a Profile</label>
            <select
              id="profileSelect"
              className="form-control mb-3"
              onChange={(e) => {
                const selectedProfile = profiles.find(
                  (profile) => profile.p_id === parseInt(e.target.value)
                );
                if (selectedProfile) {
                  handleProfileSelect(
                    selectedProfile.p_id,
                    selectedProfile.p_name
                  );
                }
              }}
            >
              <option value="">-- Select Profile --</option>
              {profiles.map((profile) => (
                <option key={profile.p_id} value={profile.p_id}>
                  {profile.p_name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p>No profiles found for this user.</p>
        )}

        <h2 className="mt-4">Create a New Profile</h2>
        <form onSubmit={handleCreateProfile}>
          <div className="form-group">
            <label htmlFor="profileName">Profile Name</label>
            <input
              type="text"
              id="profileName"
              name="p_name"
              className="form-control"
              placeholder="Profile Name"
              value={newProfile.p_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="p_email"
              className="form-control"
              placeholder="Email"
              value={newProfile.p_email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="p_username"
              className="form-control"
              placeholder="Username"
              value={newProfile.p_username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="p_password"
              className="form-control"
              placeholder="Password"
              value={newProfile.p_password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSelection;
