import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUpUser } from '../../actions/authActions';
import './SignUp.scss';

function SignUp({ signUpUser }) {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const onFormChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    signUpUser(form);
  };

  return (
    <div className="main-signup">
      <h1 className="text-center">Sign Up</h1>
      <form onSubmit={onSubmit} className="signup-form">
        <div className="inputItem">
          <input
            type="text"
            name="username"
            placeholder="username"
            value={form.username}
            onChange={onFormChange}
          />
        </div>
        <div className="inputItem">
          <input
            type="password"
            name="password"
            placeholder="password"
            value={form.password}
            onChange={onFormChange}
          />
        </div>
        <p className="info">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
        <button className="btn">Sign Up</button>
      </form>
    </div>
  );
}

export default connect(null, { signUpUser })(SignUp);
