import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ListingPage1 from './pages/ListingPage1'
import ListingPage2 from './pages/ListingPage2'
import ListingPage3 from './pages/ListingPage3'
import MyListing from './pages/MyListing' // <--- Import the new page
import { userDataContext } from './Context/UserContext'

// The "Security Guard" component
const ProtectedRoute = ({ children }) => {
  const { userData } = useContext(userDataContext);
  
  if (!userData) {
    // If not logged in, send them to login
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Locked Routes - Wrap them in ProtectedRoute */}
      <Route path="/listingpage1" element={
        <ProtectedRoute>
          <ListingPage1 />
        </ProtectedRoute>
      } />
      
      <Route path="/listingpage2" element={
        <ProtectedRoute>
          <ListingPage2 />
        </ProtectedRoute>
      } />

      <Route path="/listingpage3" element={
        <ProtectedRoute>
          <ListingPage3 />
        </ProtectedRoute>
      } />

      {/* New: path="/mylisting" */}
<Route path="/mylisting" element={
  <ProtectedRoute>
    <MyListing />
  </ProtectedRoute>
} />

    </Routes>
  )
}

export default App