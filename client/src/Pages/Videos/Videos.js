import React, { useEffect, useState } from 'react';
import Suggestion from '../../Components/Suggestion/Suggestion';
import Spinner from '../../Components/Spinner/Spinner';
import './Videos.scss';
import { connect } from 'react-redux';
import { getVideos } from '../../actions/videoActions';

function Videos({ videos, loading, getVideos, location }) {
  const [gettingVideos, setGettingVideos] = useState(false);
  useEffect(() => {
    setGettingVideos(true);
    getVideos(location.search);
  }, [location.search]);

  if (loading || !gettingVideos) return <Spinner />;

  return (
    <div className="videoMain">
      {videos.length === 0 && (
        <p className="text-center">
          {location.search
            ? 'No results found. Try a different search.'
            : 'Please subscribe to channels to get reccommended videos.'}
        </p>
      )}
      <div className="videos">
        {videos.map(video => (
          <Suggestion key={video.uuid} {...video} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  videos: state.video.videos,
  loading: state.video.loading
});

export default connect(mapStateToProps, { getVideos })(Videos);
