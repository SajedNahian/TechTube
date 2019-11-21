import React from 'react';
import { Link } from 'react-router-dom';
import './Suggestion.scss';

export default function Suggestion({ title, uuid, views }) {
  return (
    <Link to={`/videos/${uuid}`}>
      <div className="suggestion">
        <img src={`/api/thumbnails/${uuid}.png`} />
        <h3>{title}</h3>
        <p>{views} views</p>
      </div>
    </Link>
  );
}
