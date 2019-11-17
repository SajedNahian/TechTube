import React, { useState, useEffect } from 'react';
import { Player } from 'video-react';
import axios from 'axios';
import 'video-react/dist/video-react.css';
import './Main.scss';
import Suggestion from '../Suggestion/Suggestion';
import Comment from '../Comment/Comment';
import Spinner from '../Spinner/Spinner';
import { Redirect } from 'react-router-dom';

function Main({
  match: {
    params: { videoId }
  }
}) {
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState({});
  const [suggestedVideos, setSuggestedVideos] = useState([]);

  useEffect(() => {
    setLoading(true);
    setSuggestedVideos([]);
    const getVideo = async () => {
      try {
        let response = await axios.get(`/api/videos/${videoId}`);
        setVideo(response.data.video);
        setLoading(false);

        response = await axios.get(`/api/videos/${videoId}/suggestions`);
        setSuggestedVideos(response.data.videos);
      } catch (e) {
        setVideo(null);
        setLoading(false);
      }
    };
    getVideo();
  }, [videoId]);
  if (loading) return <Spinner />;
  if (!video) return <Redirect to="/videos" />;

  return (
    <div>
      <div className="main">
        <div className="video">
          <Player playsInline src={`/api/videos/stream/${videoId}`} autoPlay />
          <div className="header">
            <div className="left">
              <h1 className="title">{video.title}</h1>
              <p>{video.views} views - January 1, 2012</p>
            </div>
            <div className="right">
              <div className="likes">👍13</div>
              <div className="dislikes">👎2</div>
            </div>
          </div>
          <div className="lower-info">
            <div className="video-creator">
              <img
                className="profile-picture"
                src="https://icon-library.net/images/no-profile-picture-icon/no-profile-picture-icon-13.jpg"
              />
              <p className="name">
                <a href="#">ChickenMan12</a>
                <p>1,200 subscribers</p>
              </p>
            </div>
            <button className="btn btn-red">Subscribe</button>
          </div>
        </div>
        <div className="suggestions">
          {suggestedVideos.length === 0 ? (
            <Spinner />
          ) : (
            suggestedVideos.map(video => (
              <Suggestion key={video.uuid} {...video} />
            ))
          )}
        </div>
        <div className="comments">
          <h2>Comments</h2>
          <form className="comment-form">
            <textarea placeholder="What are your thoughts?"></textarea>
            <button className="btn">Comment</button>
          </form>
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  );
}

export default Main;
