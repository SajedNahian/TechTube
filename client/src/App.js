import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import Upload from './Pages/Upload/Upload';
import Main from './Components/Main/Main';
import Videos from './Pages/Videos/Videos';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/upload" component={Upload} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/videos/:videoId" component={Main} />
          <Route path="/videos" component={Videos} />
          <Route path="/">Sorry that was not found</Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
