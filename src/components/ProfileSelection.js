import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileSelection = () => {
  const { userId } = useParams(); // Extract userId from the URL
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProfile, setNewProfile] = useState({
    p_name: '',
    p_email: '',
    p_username: '',
    p_password: '',
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
        console.error('Error fetching profiles:', err);
        setError('Failed to fetch profiles. Please try again later.');
        setLoading(false);
      });
  }, [userId]);

  const handleProfileSelect = (profileId) => {
    if (profileId) {
      navigate(`/profile/${profileId}`);
    }
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
      .post('http://localhost:5001/profiles', {
        ...newProfile,
        u_id: userId, // Associate the new profile with the current user
      })
      .then((response) => {
        setProfiles([...profiles, response.data]); // Add the new profile to the list
        setNewProfile({ p_name: '', p_email: '', p_username: '', p_password: '' }); // Reset form
      })
      .catch((err) => {
        console.error('Error creating profile:', err);
        alert('Failed to create profile. Please try again.');
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
        <select onChange={(e) => handleProfileSelect(e.target.value)}>
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
