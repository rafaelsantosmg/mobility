import { LoadScript } from '@react-google-maps/api';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import History from '../pages/History';
import Home from '../pages/Home';
import Maps from '../pages/Maps';

const AppRoutes = () => {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </LoadScript>
  );
};

export default AppRoutes;
