import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { postComment } from '../../actions/commentsActions';

function CommentForm({ postComment, videoId, auth: { user } }) {
  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    postComment(videoId, text);
    setText('');
  };

  return (
    <form className="comment-form" onSubmit={onSubmit}>
      {user ? (
        <Fragment>
          <textarea
            placeholder="What are your thoughts?"
            onChange={e => setText(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') onSubmit(e);
            }}
            value={text}
          ></textarea>{' '}
          <button className="btn">Comment</button>
        </Fragment>
      ) : (
        <p>Login to post comments</p>
      )}
    </form>
  );
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { postComment })(CommentForm);
