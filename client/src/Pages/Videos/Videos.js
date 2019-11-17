import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Suggestion from '../../Components/Suggestion/Suggestion';
import Spinner from '../../Components/Spinner/Spinner';
import './Videos.scss';

export default function Videos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const response = await axios.get('/api/videos');
      setVideos(response.data.videos);
    };
    getVideos();
  }, []);

  if (videos.length === 0) return <Spinner />;

  return (
    <div className="videoMain">
      <div className="videos">
        {videos.map(video => (
          <Suggestion key={video.uuid} {...video} />
        ))}
      </div>
    </div>
  );
}
