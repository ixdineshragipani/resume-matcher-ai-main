import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Pages
import LandingPage from '../pages/LandingPage';
import CompanyLogin from '../pages/CompanyLogin';
import CompanyRegister from '../pages/CompanyRegister';
import UserLogin from '../pages/UserLogin';
import UserRegister from '../pages/UserRegister';
import CompanyDashboard from '../pages/CompanyDashboard';
import UserDashboard from '../pages/UserDashboard';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/Profile" element={<Profile />} />
      
      {/* Company Auth Routes */}
      <Route path="/company/login" element={<CompanyLogin />} />
      <Route path="/company/register" element={<CompanyRegister />} />
      
      {/* User Auth Routes */}
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/register" element={<UserRegister />} />
      
      {/* Protected Company Routes */}
      <Route
        path="/company/dashboard"
        element={
          <ProtectedRoute userType="company">
            <CompanyDashboard />
          </ProtectedRoute>
        }
      />
      
      {/* Protected User Routes */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute userType="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      
      {/* Catch-all Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
