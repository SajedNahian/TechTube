import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

export default function NotFound() {
  return (
    <div className="main-not-found text-center">
      <h2>Sorry that page was not found!</h2>
      <p className="instructions">
        Here are some links you may be interested in:
      </p>
      <Link to="/videos">Videos</Link>
    </div>
  );
}
