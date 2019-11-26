import React, { Fragment, useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Alert from '../../Components/Alert/Alert';
import { withRouter } from 'react-router-dom';

function Navbar({ auth: { isAuthenticated, user }, errors, history }) {
  const [query, setQuery] = useState('');
  const [showMobileSearch, setMobileSearch] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) setMobileSearch(false);
    setWidth(window.innerWidth);
  });

  const loggedOutLinks = (
    <Fragment>
      <Link to="/login" style={{ marginRight: '1rem' }}>
        Log In
      </Link>
      <Link to="/signup">Sign Up</Link>
    </Fragment>
  );

  const loggedInLinks = (
    <Fragment>
      <button className="mobile-search" onClick={() => setMobileSearch(true)}>
        <i className="fa fa-search"></i>
      </button>
      <Link to="/upload" className="upload-btn">
        +
      </Link>
      <Link to="/profile" className="profile-link">
        <img
          className="profile"
          src={isAuthenticated ? user.profilePicture : ''}
        />
      </Link>
    </Fragment>
  );

  if (showMobileSearch && width < 800) {
    return (
      <nav>
        <div className="mobile-search-field">
          <button
            className="mobile-icon"
            onClick={() => setMobileSearch(false)}
          >
            <i className="fa fa-arrow-left"></i>
          </button>
          <input
            className=""
            type="text"
            placeholder="Search..."
            value={query}
            onKeyPress={e => {
              if (query === '') return;
              if (e.key === 'Enter') history.push(`/videos?search=${query}`);
            }}
            onChange={e => {
              setQuery(e.target.value);
            }}
          />
          <button
            className="mobile-icon"
            onClick={() => {
              if (query === '') return;
              history.push(`/videos?search=${query}`);
            }}
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
      </nav>
    );
  }

  return (
    <Fragment>
      <nav>
        <div className="left">
          <Link to="/videos" className="logo">
            <img src="https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c545.png" />
            TechTube
          </Link>
        </div>
        <div className="search-container">
          <input
            className="search"
            type="text"
            placeholder="Search..."
            value={query}
            onKeyPress={e => {
              if (query === '') return;
              if (e.key === 'Enter') history.push(`/videos?search=${query}`);
            }}
            onChange={e => {
              setQuery(e.target.value);
            }}
          />
          <button
            className="search-btn"
            onClick={() => {
              if (query === '') return;
              history.push(`/videos?search=${query}`);
            }}
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div className="right">
          {isAuthenticated ? loggedInLinks : loggedOutLinks}
        </div>
      </nav>
      {errors.map(error => (
        <Alert message={error.message} />
      ))}
    </Fragment>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(Navbar));
