import React from 'react';
import { connect } from 'react-redux';
import './Comment.scss';
import formatDateFrom from '../../utils/formatDateFrom';

function Comment({
  text,
  user: { username, profilePicture },
  username: authorUsername,
  date
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
              'username' +
              (username === authorUsername ? ' author-username' : '')
            }
            href="#"
          >
            {username}
          </a>
          <span style={{ paddingLeft: '.4rem', color: 'rgb(99, 97, 97)' }}>
            {formatDateFrom(date)}
          </span>
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
