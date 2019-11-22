import React from 'react';
import { connect } from 'react-redux';
import './Comment.scss';

function Comment({
  text,
  user: { username, profilePicture },
  username: authorUsername
}) {
  return (
    <div
      className={
        'comment' + (username === authorUsername ? ' author-comment' : '')
      }
    >
      <img className="profile-picture" src={profilePicture} />
      <div className={'comment-body'}>
        <p>
          <a
            className={
              'username' + (username === authorUsername ? ' text-bold' : '')
            }
            href="#"
          >
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

const mapStateToProps = state => ({
  username: state.video.video.author.username
});

export default connect(mapStateToProps)(Comment);
