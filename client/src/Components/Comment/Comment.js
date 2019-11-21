import React from 'react';
import './Comment.scss';

export default function Comment({ text, user: { username, profilePicture } }) {
  return (
    <div className="comment">
      <img className="profile-picture" src={profilePicture} />
      <div className="comment-body">
        <p>
          <a className="username" href="#">
            {username}
          </a>
        </p>
        <p className="comment-text">{text}</p>
        {/* <p className="votes">
          <i className="fa fa-thumbs-up"></i>2<i class="fa fa-thumbs-down"></i>
        </p> */}
      </div>
    </div>
  );
}
