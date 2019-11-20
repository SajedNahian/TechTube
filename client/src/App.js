import React, { useEffect } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import MainRoutes from './MainRoutes';
import setAuthToken from './utils/setAuthToken';
import { authenticateUser } from './actions/authActions';

function App() {
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      setAuthToken(localStorage.getItem('jwt'));
    }
    store.dispatch(authenticateUser());
  }, []);

  return (
    <Provider store={store}>
      <MainRoutes />
    </Provider>
  );
}

export default App;
