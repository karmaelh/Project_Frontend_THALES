import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../services/UserService';

export default function UserForm() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    position: '',
    department: '',
    photoUrl: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      userService.getById(id).then((res) => {
        setUser({
          username: res.data.username || '',
          email: res.data.email || '',
          position: res.data.position || '',
          department: res.data.department || '',
          photoUrl: res.data.photoUrl || '',
          password: '' // leave empty for security
        });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      username: user.username,
      email: user.email,
      position: user.position,
      department: user.department,
      photoUrl: user.photoUrl
    };

    if (!isEdit) {
      payload.password = user.password;
      userService.create(payload).then(() => navigate('/'));
    } else {
      userService.update(id, payload).then(() => navigate('/'));
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isEdit ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <input
            className="form-control"
            name="username"
            placeholder="Full Name"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        {!isEdit && (
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="mb-3">
          <input
            className="form-control"
            name="position"
            placeholder="Position"
            value={user.position}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            name="department"
            placeholder="Department"
            value={user.department}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            name="photoUrl"
            placeholder="Link to photo"
            value={user.photoUrl}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success me-2">Save</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
}
