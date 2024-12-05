import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const GroupDetails = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const [groupRes, membersRes] = await Promise.all([
          axios.get(`http://localhost:5001/groups/${groupId}`),
          axios.get(`http://localhost:5001/groups/${groupId}/members`),
        ]);
        setGroup(groupRes.data);
        setMembers(membersRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching group details:", err);
        setError("Failed to fetch group details. Please try again later.");
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [groupId]);

  if (loading) {
    return <p>Loading group details...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h1>Group Details</h1>
        {group ? (
          <div className="card p-3">
            <h2 className="card-title">{group.g_name}</h2>
            <p className="card-text">Members: {group.g_members}</p>
            <p className="card-text">Creator Profile ID: {group.g_creator}</p>
          </div>
        ) : (
          <p className="text-danger">Group not found.</p>
        )}
      </div>

      <div className="mb-5">
        <h2>Group Members</h2>
        {members.length > 0 ? (
          <ul className="list-group">
            {members.map((member) => (
              <li key={member.p_id} className="list-group-item">
                <Link
                  to={`/profile/${member.p_id}`}
                  className="text-decoration-none"
                >
                  {member.p_name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No members found in this group.</p>
        )}
      </div>
    </div>
  );
};

export default GroupDetails;
