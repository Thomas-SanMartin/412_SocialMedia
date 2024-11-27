import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserSelection = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    axios
      .get('http://localhost:5001/users')
      .then((response) => {
        setUsers(response.data);
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Select a User</h1>
      <select onChange={(e) => onUserSelect(e.target.value)}>
        <option value="">-- Select User --</option>
        {users.map((user) => (
          <option key={user.u_id} value={user.u_id}>
            {user.u_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelection;
