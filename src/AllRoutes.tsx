import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
// import RegisterPage from './pages/RegisterPage'
// import SongPage from './pages/SongPage'
// import SubscriptionPage from './pages/SubscriptionPage'

function AllRoutes() {
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/register" element={<RegisterPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/song" element={<SongPage />} /> */}
        </Routes>
    </>
  )
}

export default AllRoutes