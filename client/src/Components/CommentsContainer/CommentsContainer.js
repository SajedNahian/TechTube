import React, { useEffect } from 'react';
import CommentForm from '../CommentForm/CommentForm';
import Comment from '../Comment/Comment';
import { connect } from 'react-redux';
import { loadComments } from '../../actions/commentsActions';
import Spinner from '../../Components/Spinner/Spinner';
import './CommentsContainer.scss';

function CommentsContainer({
  videoId,
  loadComments,
  comments: { loading, comments }
}) {
  useEffect(() => {
    loadComments(videoId);
  }, [videoId]);

  return (
    <div className="comments">
      <h2>Comments</h2>
      <CommentForm videoId={videoId} />
      {loading ? (
        <Spinner />
      ) : (
        comments.map(comment => <Comment key={comment._id} {...comment} />)
      )}
    </div>
  );
}

const mapStateToProps = state => ({ comments: state.comments });

export default connect(mapStateToProps, { loadComments })(CommentsContainer);
