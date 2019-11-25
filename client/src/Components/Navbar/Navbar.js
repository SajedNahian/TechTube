import React, { Fragment, useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Alert from '../../Components/Alert/Alert';
import { withRouter } from 'react-router-dom';

function Navbar({ auth: { isAuthenticated, user }, errors, history }) {
  const [query, setQuery] = useState('');

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
