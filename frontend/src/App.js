import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import UserSelection from "./components/UserSelection";
import ProfileSelection from "./components/ProfileSelection";
import ProfileDetails from "./components/ProfileDetails";
import GroupDetails from "./components/GroupDetails";
import PostDetails from "./components/PostDetails";

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
    <div>
      <a href="/">HOME </a>
      {loggedInProfileId && (
        <p>
          Logged in as: {loggedInProfileName || "Unknown Profile"} (Profile ID:{" "}
          {loggedInProfileId})
        </p>
      )}

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
