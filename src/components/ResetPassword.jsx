import React, { useState } from 'react';
import axios from 'axios';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('http://localhost:5000/api/v1/auth/reset-password', {
        email,
        new_password: newPassword,
      });

      console.log(response.data);
      setSuccess(true);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to reset password. Please check the email.');
      setSuccess(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2 className="mb-4 text-center">Reset Password</h2>

        <form onSubmit={handleReset}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Update Password</button>
        </form>

        {success && (
          <>
          <div className="alert alert-success mt-3">Password updated successfully</div>
          <div className="text-center mt-3">
            <a href="/login" className="btn btn-outline-primary">
              Back to Login
            </a>
          </div>
          </>
        )}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
}
