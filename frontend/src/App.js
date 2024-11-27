import { Routes, Route, useNavigate } from 'react-router-dom';
import UserSelection from './components/UserSelection';
import ProfileSelection from './components/ProfileSelection';
import ProfileDetails from './components/ProfileDetails';

const App = () => {
  const navigate = useNavigate();

  const handleUserSelect = (userId) => {
    if (userId) {
      navigate(`/profiles/${userId}`);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<UserSelection onUserSelect={handleUserSelect} />} />
      <Route path="/profiles/:userId" element={<ProfileSelection />} />
      <Route path="/profile/:profileId" element={<ProfileDetails />} />
    </Routes>
  );
};

export default App;
