import React, { useState } from 'react';
import axios from 'axios';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Upload.scss';
import { addError } from '../../actions/errorsActions';

function Upload({ addError }) {
  const [file, setFile] = useState('');
  const [title, setTitle] = useState('');
  const [percentUploaded, setPercentUploaded] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
      await axios.post('/api/videos', formData, {
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

      setFile('');
      setTitle('');
      setPercentUploaded(0);
      setUploadComplete(true);
    } catch (err) {
      // console.log(err.response.data);
      err.response.data.errors.forEach(error => {
        addError(error);
      });
      setPercentUploaded(0);
    }
  };

  if (uploadComplete) return <Redirect to="/videos" />;

  return (
    <div className="main-upload">
      <h1 className="text-center title">Upload Video</h1>
      <form className="upload" onSubmit={onSubmit}>
        <div className="inputItem">
          <input type="file" onChange={e => setFile(e.target.files[0])} />
        </div>
        <div className="inputItem">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        {percentUploaded > 0 && <ProgressBar percent={percentUploaded} />}
        <button className="btn">Upload</button>
      </form>
    </div>
  );
}

export default connect(null, { addError })(Upload);
