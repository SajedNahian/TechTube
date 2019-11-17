import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.scss';

export default function Login() {
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
      const response = await axios.post('/api/user/login', form);
      console.log(response.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };
  return (
    <div className="main-login">
      <h1 className="text-center">Log In</h1>
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
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <button className="btn">Log In</button>
      </form>
    </div>
  );
}
