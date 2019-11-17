import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SignUp.scss';

export default function SignUp() {
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
    try {
      const response = await axios.post('/api/user/', form);
      console.log(response.data);
    } catch (e) {
      console.log(e.response.data);
    }
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
