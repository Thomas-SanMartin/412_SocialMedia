import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfileDetails = () => {
  const { profileId } = useParams(); // Extract profileId from the URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch profile details
    axios
      .get(`http://localhost:5001/profile/${profileId}`)
      .then((response) => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching profile details:', err);
        setError('Failed to fetch profile details. Please try again later.');
        setLoading(false);
      });
  }, [profileId]);

  if (loading) {
    return <p>Loading profile details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Profile not found.</p>;
  }

  return (
    <div>
      <h1>{profile.p_name}</h1>
      <p>Email: {profile.p_email}</p>
      <p>Username: {profile.p_username}</p>
      <p>Created On: {profile.p_datemade}</p>
    </div>
  );
};

export default ProfileDetails;
