import React, { useState, useEffect } from "react";
import axios from "axios";

const UserSelection = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const [newUser, setNewUser] = useState({
    u_name: "",
    u_birthdate: "",
  }); // For new user creation

  useEffect(() => {
    axios
      .get("http://localhost:5001/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!newUser.u_name || !newUser.u_birthdate) {
      alert("User name and birthdate are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/users", {
        ...newUser,
      });
      setUsers([...users, response.data]); // Add the new user to the list
      setNewUser({ u_name: "", u_birthdate: "" }); // Reset form fields
      alert(`User "${response.data.u_name}" created successfully!`);
    } catch (err) {
      console.error("Error creating user:", err);
      alert("Failed to create user. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center">Loading users...</p>;
  }

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  return (
    <div className="card shadow-sm p-4">
      <h2 className="text-center mb-4">Select a User</h2>
      <div className="form-group">
        <select
          className="form-control mb-3"
          onChange={(e) => onUserSelect(e.target.value)}
        >
          <option value="">-- Select User --</option>
          {users.map((user) => (
            <option key={user.u_id} value={user.u_id}>
              {user.u_name}
            </option>
          ))}
        </select>
      </div>

      <h3 className="text-center mb-3">Create a New User</h3>
      <form onSubmit={handleCreateUser} className="form-inline justify-content-center">
        <div className="form-group mr-2">
          <input
            type="text"
            className="form-control"
            name="u_name"
            placeholder="Enter User Name"
            value={newUser.u_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mr-2">
          <input
            type="date"
            className="form-control"
            name="u_birthdate"
            placeholder="Enter Birthdate"
            value={newUser.u_birthdate}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create User
        </button>
      </form>
    </div>
  );
};

export default UserSelection;
