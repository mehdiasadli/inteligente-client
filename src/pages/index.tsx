import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import HomeLayout from '../layouts/HomeLayout';
import { USER_ROLE } from '../lib/types';
import { useAuth } from '../store/hooks';
import AdminDashboard from './AdminDashboard';
import CreatePage from './CreatePage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import QuizPage from './QuizPage';
import RegisterPage from './RegisterPage';
import SettingsPage from './SettingsPage';
import StatsPage from './StatsPage';
import UserPage from './UserPage';

export default function Navigator() {
  const { role } = useAuth();

  return (
    <Routes>
      <Route path='/auth' element={!role ? <AuthLayout /> : <Navigate to='/' />}>
        <Route index element={<Navigate to='login' />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
      </Route>
      <Route path='/' element={role ? <HomeLayout /> : <Navigate to='/auth' />}>
        <Route index element={<HomePage />} />
        <Route path='/quiz' element={<QuizPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/user/:id' element={<UserPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/stats' element={<StatsPage />} />
        <Route
          path='/create'
          element={role !== USER_ROLE.MEMBER ? <CreatePage /> : <Navigate to='/' />}
        />
        <Route
          path='/dashboard'
          element={role === USER_ROLE.ADMIN ? <AdminDashboard /> : <Navigate to='/' />}
        />
      </Route>
    </Routes>
  );
}
