import { Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SongPage from './pages/SongPage'
import SubscriptionPage from './pages/SubscriptionPage'
import { FC } from 'react';

const ProtectedRoute: FC<{ token: string | null; children:any }> = ({
  token, children
}) => {
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

const AllRoutes = () => {
  const token = sessionStorage.getItem("auth_token");

  return (
    <>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/subscription" element={
              <ProtectedRoute token = {token}>
                <SubscriptionPage />
              </ProtectedRoute>
            }/>
            <Route path="/song" element={
              <ProtectedRoute token = {token}>
                <SongPage />
              </ProtectedRoute>
            }/>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </>
  )
}

export default AllRoutes