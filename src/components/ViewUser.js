import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '../services/UserService';
import UserSummary from './UserSummary';
import Preloader from './Preloader.js';


export default function ViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  userService.getById(id)
    .then((res) => {
      setTimeout(() => setUser(res.data), 3000 );
    })
    .catch(() => {
      alert("User not found.");
      navigate('/');
    });
}, [id, navigate]);

  if (!user) return <Preloader />;


  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4">User Profile</h2>

        {user.photoUrl && (
          <div className="mb-3 text-center">
            <img
              src={user.photoUrl}
              alt={user.username}
              className="rounded-circle"
              width="150"
              height="150"
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}

        <p><strong>Name:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Position:</strong> {user.position || '-'}</p>
        <p><strong>Department:</strong> {user.department || '-'}</p>
        <p><strong>Hire Date:</strong> {user.hire_date ? new Date(user.hire_date).toLocaleDateString() : '-'}</p>

        <div className="mt-4"><UserSummary userId={user.id} /></div>

        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
          Back to list
        </button>
      </div>
    </div>
  );
}
