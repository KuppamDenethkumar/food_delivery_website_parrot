import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Placeholder components - implement actual pages
const HomePage = () => <div className="page"><h1>🦜 Parrot - Food Delivery</h1><p>Welcome! Browse restaurants below.</p></div>;
const RestaurantsPage = () => <div className="page"><h1>Restaurants</h1><p>Restaurant listings coming soon...</p></div>;
const OrdersPage = () => <div className="page"><h1>My Orders</h1><p>Your order history will appear here.</p></div>;
const LoginPage = () => <div className="page"><h1>Login</h1><p>Login form coming soon...</p></div>;
const AdminPage = () => <div className="page"><h1>Admin Dashboard</h1><p>Admin panel coming soon...</p></div>;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          setUser(res.data);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <Router>
      <div className="App">
        <header className="navbar">
          <div className="navbar-brand">🦜 Parrot</div>
          <nav className="navbar-nav">
            <a href="/">Home</a>
            <a href="/restaurants">Restaurants</a>
            {isLoggedIn ? (
              <>
                <a href="/orders">Orders</a>
                {user?.role === 'admin' && <a href="/admin">Admin</a>}
                <button onClick={() => {
                  localStorage.removeItem('token');
                  setIsLoggedIn(false);
                }}>Logout</button>
              </>
            ) : (
              <a href="/login">Login</a>
            )}
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurants" element={<RestaurantsPage />} />
            <Route path="/orders" element={isLoggedIn ? <OrdersPage /> : <Navigate to="/login" />} />
            <Route path="/login" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/admin" element={isLoggedIn && user?.role === 'admin' ? <AdminPage /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2024 Parrot Food Delivery. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
