import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '../pages/home';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
