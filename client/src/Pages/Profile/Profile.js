import React, { Fragment, useState } from 'react';
import './Profile.scss';
import axios from 'axios';
import { addError } from '../../actions/errorsActions';
import { authenticateUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';

function Profile({ history, addError, authenticateUser }) {
  const [file, setFile] = useState('');
  const [percentUploaded, setPercentUploaded] = useState(0);

  const onUpdateProfilePicture = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('/api/user/profilePicture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent =>
          setPercentUploaded(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          )
      });
      authenticateUser();
      history.push('/videos');
    } catch (err) {
      err.response.data.errors.forEach(error => {
        addError(error);
      });
      setPercentUploaded(0);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center profile-header">Profile</h1>
      <div className="profile-container box-shadow">
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        {percentUploaded > 0 && <ProgressBar percent={percentUploaded} />}
        <button className="btn" onClick={onUpdateProfilePicture}>
          Update profile picture
        </button>
      </div>
    </Fragment>
  );
}

export default connect(null, { addError, authenticateUser })(Profile);
