import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v1/auth/login', {
        email,
        password
      });

      const { access_token } = response.data;
      localStorage.setItem('token', access_token); // Sauvegarde du token
      navigate('/'); // Redirection vers la liste des utilisateurs

    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2 className="mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-end mt-1">
            <a href="/reset-password" className="text-decoration-none small">
            Forgot your password?
            </a>
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>

          <p className="mt-3 text-center">
            Don't have an account? <a href="/register">Create one</a>
          </p>

        </form>
      </div>
    </div>
  );
}
