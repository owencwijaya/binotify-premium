import { Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SongPage from './pages/SongPage'
import SubscriptionPage from './pages/SubscriptionPage'
import { FC } from 'react';

const ProtectedRoute: FC<{ token: string | null; is_admin: boolean | null; children:any }> = ({
  token, is_admin, children
}) => {
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

const AllRoutes = () => {
  const token = sessionStorage.getItem("auth_token");
  const is_admin = sessionStorage.getItem("is_admin") === "true";

  return (
    <>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/subscription" element={
              <ProtectedRoute token = {token} is_admin = {is_admin}>
                <SubscriptionPage />
              </ProtectedRoute>
            }/>
            <Route path="/song" element={
              <ProtectedRoute token = {token} is_admin = {is_admin}>
                <SongPage />
              </ProtectedRoute>
            }/>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </>
  )
}

export default AllRoutes