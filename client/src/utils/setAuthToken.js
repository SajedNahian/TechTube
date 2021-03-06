import axios from 'axios';
const setAuthToken = token => {
  console.log('setting');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log(axios.defaults.headers.common['Authorization']);
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
