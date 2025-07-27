import React from 'react';
import logoThales from '../assets/2.png';
import './Preloader.css';

export default function Preloader() {
  return (
    <div className="preloader-wrapper">
      <img src={logoThales} alt="Thales Logo" className="preloader-logo" />
    </div>
  );
}

