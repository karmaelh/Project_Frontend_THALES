import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/thales-logo.png';

export default function Navbar() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get('http://127.0.0.1:5000/api/v1/users/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUsername(response.data.username);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-1">
    <div className="container align-items-center">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src={logo}
          alt="Thales Logo"
          style={{ height: '95px', objectFit: 'contain' }}
        />
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto align-items-center">
          {token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">Add User</Link>
              </li>
              <li className="nav-item d-flex align-items-center me-3">
                <span className="nav-link"><strong>{username}</strong></span>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  </nav>
);

}
