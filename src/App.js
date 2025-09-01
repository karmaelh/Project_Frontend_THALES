import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import ListUsers from './components/ListUsers';
import UserForm from './components/UserForm';
import ViewUser from './components/ViewUser';
import RequireAuth from './components/RequireAuth';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<RequireAuth><ListUsers /></RequireAuth>} />
        <Route path="/add" element={<RequireAuth><UserForm /></RequireAuth>} />
        <Route path="/edit/:id" element={<RequireAuth><UserForm /></RequireAuth>} />
        <Route path="/view/:id" element={<RequireAuth><ViewUser /></RequireAuth>} />
      </Routes>
    </>
  );
}

export default App;


