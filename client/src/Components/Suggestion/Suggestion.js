import React from 'react';
import { Link } from 'react-router-dom';
import './Suggestion.scss';

export default function Suggestion({ title, uuid, views }) {
  return (
    <Link to={`/videos/${uuid}`}>
      <div className="suggestion">
        <img src="https://www.pcuinc.com/wp-content/uploads/2018/02/Rectangle-1920x1080-Placeholder.png" />
        <h3>{title}</h3>
        <p>{views} views</p>
      </div>
    </Link>
  );
}
