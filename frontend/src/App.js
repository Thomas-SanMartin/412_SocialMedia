import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import UserSelection from "./components/UserSelection";
import ProfileSelection from "./components/ProfileSelection";
import ProfileDetails from "./components/ProfileDetails";
import GroupDetails from "./components/GroupDetails";
import PostDetails from "./components/PostDetails";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [loggedInProfileId, setLoggedInProfileId] = useState(null);
  const [loggedInProfileName, setLoggedInProfileName] = useState("");
  const navigate = useNavigate();

  const handleProfileLogin = (profileId, profileName) => {
    setLoggedInProfileId(profileId);
    setLoggedInProfileName(profileName || ""); // Fallback for missing name
    navigate(`/profile/${profileId}`);
  };

  return (
    <div className="container mt-4">
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        
        <a href="/" className="btn btn-primary">
          HOME
        </a>
        
        {loggedInProfileId && (
          <p className="mb-0">
            <strong>Logged in as:</strong> {loggedInProfileName || "Unknown Profile"}{" "}
            <span className="text-muted">(Profile ID: {loggedInProfileId})</span>
          </p>
        )}
        <h1>412 Social Media</h1>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <UserSelection
              onUserSelect={(userId) => {
                setLoggedInProfileId(null); // Reset state
                setLoggedInProfileName("");
                navigate(`/profiles/${userId}`);
              }}
            />
          }
        />
        <Route
          path="/profiles/:userId"
          element={<ProfileSelection onProfileSelect={handleProfileLogin} />}
        />
        <Route
          path="/profile/:profileId"
          element={
            <ProfileDetails
              loggedInProfileId={loggedInProfileId}
              loggedInProfileName={loggedInProfileName}
            />
          }
        />
        <Route
          path="/groups/:groupId"
          element={<GroupDetails loggedInProfileId={loggedInProfileId} />}
        />
        <Route
          path="/posts/:postId"
          element={<PostDetails loggedInProfileId={loggedInProfileId} />}
        />
      </Routes>
    </div>
  );
};

export default App;
