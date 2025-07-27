import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../services/UserService';
import Preloader from './Preloader';

export default function UserForm() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    position: '',
    department: '',
    photoUrl: '',
    hire_date: '',
    photoFile: null,
  });

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
  if (isEdit) {
    setLoading(true);
    userService.getById(id)
      .then((res) => {
        setUser({
          username: res.data.username || '',
          email: res.data.email || '',
          position: res.data.position || '',
          department: res.data.department || '',
          photoUrl: res.data.photoUrl || '',
          hire_date: res.data.hire_date ? res.data.hire_date.substring(0,10) : '',
          password: ''
        });
      })
      .catch((err) => {
        console.error("Error loading user:", err);
        alert("Failed to load user.");
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 1000);
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


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let photoUrl = user.photoUrl;

    if (user.photoFile) {
      const response = await userService.uploadPhoto(user.photoFile);
      photoUrl = response.data.photoUrl; 
    }

    const payload = {
      username: user.username,
      email: user.email,
      position: user.position,
      department: user.department,
      photoUrl: photoUrl,
      hire_date: user.hire_date,
    };

    if (!isEdit) {
      payload.password = user.password;
      await userService.create(payload);
    } else {
      await userService.update(id, payload);
    }

    navigate('/');
  } catch (error) {
    alert("An error occurred. Please try again.");
    console.error(error);
  }
};


if (loading) {
  return <Preloader />;
}

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
          <label htmlFor="photoFile" className="form-label">Upload Photo</label>
           <input
             type="file"
            id="photoFile"
            accept="image/*"
            className="form-control"
            onChange={(e) => setUser(prev => ({ ...prev, photoFile: e.target.files[0] }))}
          />
        </div>

        {user.photoUrl && (
          <div className="mb-3">
            <img
              src={user.photoUrl}
              alt="Preview"
              className="img-thumbnail"
              style={{ maxWidth: '200px' }}
            />
           </div>
          )}

        <div className="mb-3">
          <label htmlFor="hire_date" className="form-label">Hire Date</label>
          <input
            type="date"
            id="hire_date"
            name="hire_date"
            className="form-control"
            value={user.hire_date}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success me-2">Save</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
}
