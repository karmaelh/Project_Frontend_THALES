import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/UserService';
import Preloader from './Preloader';


export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [sortKey, setSortKey] = useState('username');
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
  setTimeout(() => {
    userService.getAll()
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, 1000); 
}, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      userService.delete(id).then(() => {
        setUsers(users.filter(user => user.id !== id));
      });
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!a[sortKey]) return 1;
    if (!b[sortKey]) return -1;
    return a[sortKey].toLowerCase().localeCompare(b[sortKey].toLowerCase());
  });

  if (loading) return <Preloader />;


  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Our People</h2>
          <select
            className="form-select w-auto"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="username">Sort by Name</option>
            <option value="email">Sort by Email</option>
            <option value="department">Sort by Department</option>
            <option value="position">Sort by Position</option>
          </select>
        </div>

        <button
          className="btn btn-primary mb-3"
          onClick={() => navigate('/add')}
        >
          Add User
        </button>

        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Hire Date</th>
              <th>Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {sortedUsers.length > 0 ? (
              sortedUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    {user.photoUrl ? (
                      <img
                        src={user.photoUrl}
                        alt={user.username}
                        width="50"
                        height="50"
                        style={{ objectFit: 'cover', borderRadius: '50%' }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '50px',
                          height: '50px',
                          backgroundColor: '#ccc',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold'
                        }}
                      >
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.position || '-'}</td>
                  <td>{user.department || '-'}</td>
                  <td>{user.hire_date ? new Date(user.hire_date).toLocaleDateString() : '-'}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => navigate(`/edit/${user.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => navigate(`/view/${user.id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
