import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfileSelection = ({ onProfileSelect }) => {
  const { userId } = useParams();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProfile, setNewProfile] = useState({
    p_name: "",
    p_email: "",
    p_username: "",
    p_password: "",
  });

  useEffect(() => {
    // Fetch profiles for the selected user
    axios
      .get(`http://localhost:5001/profiles/${userId}`)
      .then((response) => {
        setProfiles(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profiles:", err);
        setError("Failed to fetch profiles. Please try again later.");
        setLoading(false);
      });
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
    return <p>Loading profiles...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Profiles for User {userId}</h1>
      {profiles.length > 0 ? (
        <select
          onChange={(e) => {
            const selectedProfile = profiles.find(
              (profile) => profile.p_id === parseInt(e.target.value)
            );
            if (selectedProfile) {
              handleProfileSelect(selectedProfile.p_id, selectedProfile.p_name);
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
      ) : (
        <p>No profiles found for this user.</p>
      )}

      <h2>Create a New Profile</h2>
      <form onSubmit={handleCreateProfile}>
        <input
          type="text"
          name="p_name"
          placeholder="Profile Name"
          value={newProfile.p_name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="p_email"
          placeholder="Email"
          value={newProfile.p_email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="p_username"
          placeholder="Username"
          value={newProfile.p_username}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="p_password"
          placeholder="Password"
          value={newProfile.p_password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default ProfileSelection;
