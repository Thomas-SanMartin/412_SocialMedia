import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

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
        console.error('Error fetching group details:', err);
        setError('Failed to fetch group details. Please try again later.');
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [groupId]);

  if (loading) {
    return <p>Loading group details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Group Details</h1>
      {group ? (
        <div>
          <h2>{group.g_name}</h2>
          <p>Members: {group.g_members}</p>
          <p>Creator Profile ID: {group.g_creator}</p>
        </div>
      ) : (
        <p>Group not found.</p>
      )}

      <h2>Group Members</h2>
      {members.length > 0 ? (
        <ul>
          {members.map((member) => (
            <li key={member.p_id}>
              <Link to={`/profile/${member.p_id}`}>{member.p_name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No members found in this group.</p>
      )}
    </div>
  );
};

export default GroupDetails;
