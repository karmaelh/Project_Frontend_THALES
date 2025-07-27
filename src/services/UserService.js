import axios from 'axios';

const API_URL = "http://127.0.0.1:5000/api/v1/users";
const UPLOAD_URL = "http://127.0.0.1:5000";

const authHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const userService = {
  getAll: () => axios.get(`${API_URL}/`, authHeader()),
  create: (user) => axios.post(`${API_URL}/`, user, authHeader()),
  getById: (id) => axios.get(`${API_URL}/${id}`, authHeader()),
  update: (id, user) => axios.put(`${API_URL}/${id}`, user, authHeader()),
  delete: (id) => axios.delete(`${API_URL}/${id}`, authHeader()),
  getMe: () => axios.get(`${API_URL}/me`, authHeader()),

  uploadPhoto: (file) => {
    const formData = new FormData();
    formData.append('photo', file);

    return axios.post(`${UPLOAD_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};