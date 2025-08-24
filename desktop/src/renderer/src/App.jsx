import Layout from './Layout'
import Home from './Pages/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Exams from './Pages/Exams'
import Activity from './Pages/Activity'
import Users from './Pages/Users'
import Settings from './Pages/Settings'
import Login from './Pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from './redux/slices/authSlice'

const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Routes>
      {/* Login route */}
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default App;
