import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './Context/AuthContext' 
import UserContext from './Context/UserContext'
import ListingContext from './Context/ListingContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* 👈 Router must be on the OUTSIDE of ListingContext */}
    <AuthContext>
      <UserContext>
        <ListingContext> 
          <App />
          <ToastContainer position="top-center" autoClose={3000} />
        </ListingContext>
      </UserContext>
    </AuthContext>
  </BrowserRouter>
)