import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <div className="left">
        <Link to="/videos">
          {' '}
          <p className="logo">TechTube</p>
        </Link>
      </div>
      <div className="right">
        <Link to="/upload">
          <h2 className="upload-btn">+</h2>
        </Link>
        <Link to="/signup">
          <img
            class="profile"
            src="https://icon-library.net/images/no-profile-picture-icon/no-profile-picture-icon-13.jpg"
          />
        </Link>
      </div>
    </nav>
  );
}
