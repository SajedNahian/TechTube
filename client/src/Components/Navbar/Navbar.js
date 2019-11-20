import React, { Fragment } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Alert from '../../Components/Alert/Alert';

function Navbar({ auth: { isAuthenticated }, errors }) {
  const loggedOutLinks = (
    <Fragment>
      <Link to="/login">Log In</Link>
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
          class="profile"
          src="https://icon-library.net/images/no-profile-picture-icon/no-profile-picture-icon-13.jpg"
        />
      </Link>
    </Fragment>
  );

  return (
    <Fragment>
      <nav>
        <div className="left">
          <Link to="/videos" className="logo">
            TechTube
          </Link>
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

export default connect(mapStateToProps)(Navbar);
