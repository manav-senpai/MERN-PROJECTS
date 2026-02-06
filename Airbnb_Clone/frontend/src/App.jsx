import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ListingPage1 from './pages/ListingPage1'
import ListingPage2 from './pages/ListingPage2'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/listingpage1" element={<ListingPage1 />} />
      <Route path="/listingpage2" element={<ListingPage2 />} />

    </Routes>
  )
}

export default App