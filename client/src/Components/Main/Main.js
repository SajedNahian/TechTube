import React, { useState, useEffect } from 'react';
import { Player } from 'video-react';
import axios from 'axios';
import 'video-react/dist/video-react.css';
import './Main.scss';
import Suggestion from '../Suggestion/Suggestion';
import CommentsContainer from '../CommentsContainer/CommentsContainer';
import Spinner from '../Spinner/Spinner';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  loadVideo,
  rateVideo,
  subscribeToUser,
  unsubscribeToUser
} from '../../actions/videoActions';
import formatDate from '../../utils/formatDate';

function Main({
  match: {
    params: { videoId }
  },
  video: { loading, video },
  loadVideo,
  rateVideo,
  history,
  subscribeToUser,
  unsubscribeToUser
}) {
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [suggestedVideosLoading, setSuggestedVideosLoading] = useState(true);
  const [gettingVideo, setGettingVideo] = useState(false);
  const [titleSet, setTitleSet] = useState(false);

  useEffect(() => {
    document.title = 'TechTube';
    setTitleSet(false);
    setGettingVideo(true);
    setSuggestedVideos([]);
    const getVideo = async () => {
      try {
        let response = await axios.get(`/api/videos/${videoId}/suggestions`);
        setSuggestedVideos(response.data.videos);
        setSuggestedVideosLoading(false);
      } catch (e) {}
    };
    loadVideo(videoId, history);
    getVideo();

    return () => {
      document.title = 'TechTube';
    };
  }, [videoId]);

  if (loading || !gettingVideo) return <Spinner />;
  if (!video) return <Redirect to="/videos" />;

  const { author } = video;

  if (!titleSet) {
    document.title = video.title;
    setTitleSet(true);
  }

  return (
    <div>
      <div className="main">
        <div className="video">
          <Player playsInline src={`/api/videos/stream/${videoId}`} autoPlay />
          <div className="header">
            <div className="left">
              <h1 className="title">{video.title}</h1>
              <p>
                {video.views} views{' '}
                <span style={{ marginLeft: '.4rem', color: 'rgb(99, 97, 97)' }}>
                  {formatDate(video.datePosted)}
                </span>
              </p>
            </div>
            <div className="right">
              <div className="likes">
                <i
                  className={
                    'fa fa-thumbs-up' + (video.userRate === 1 ? ' pressed' : '')
                  }
                  onClick={() => rateVideo(videoId, 1)}
                />
                {video.likes}
              </div>
              <div className="dislikes">
                <i
                  className={
                    'fa fa-thumbs-down' +
                    (video.userRate === -1 ? ' pressed' : '')
                  }
                  onClick={() => rateVideo(videoId, -1)}
                />
                {video.dislikes}
              </div>
            </div>
          </div>
          <div className="lower-info">
            <div className="video-creator">
              <img className="profile-picture" src={author.profilePicture} />
              <p className="name">
                <a href="#">{author.username}</a>
                <p>{author.subscribers} subscribers</p>
              </p>
            </div>
            <button
              className={'btn ' + (author.subscribed ? 'btn-gray' : 'btn-red')}
              onClick={() => {
                if (author.subscribed) unsubscribeToUser(author._id);
                else subscribeToUser(author._id);
              }}
            >
              {author.subscribed ? 'Unsubsribe' : 'Subscribe'}
            </button>
          </div>
        </div>
        <div className="suggestions">
          {suggestedVideosLoading ? (
            <Spinner />
          ) : suggestedVideos.length === 0 ? (
            <p className="text-center no-suggestions">
              Hmmm... we don't have enough videos to offer any reccommendations
              here.
            </p>
          ) : (
            suggestedVideos.map(video => (
              <Suggestion key={video.uuid} {...video} />
            ))
          )}
        </div>
        <CommentsContainer videoId={videoId} />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({ video: state.video });

export default connect(mapStateToProps, {
  loadVideo,
  rateVideo,
  subscribeToUser,
  unsubscribeToUser
})(withRouter(Main));
