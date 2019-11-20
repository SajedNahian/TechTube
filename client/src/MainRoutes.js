import React from 'react';
import Upload from './Pages/Upload/Upload';
import Main from './Components/Main/Main';
import Videos from './Pages/Videos/Videos';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignedInRoute from './Components/Routes/SignedInRoute';
import SignedOutRoute from './Components/Routes/SignedOutRoute';
import { connect } from 'react-redux';
import Spinner from './Components/Spinner/Spinner';
import Navbar from './Components/Navbar/Navbar';

function MainRoutes({ auth: { loading } }) {
  if (loading) return <Spinner />;
  return (
    <Router>
      <Navbar />
      <Switch>
        <SignedInRoute path="/upload" component={Upload} />
        <SignedOutRoute path="/login" component={Login} />
        <SignedOutRoute path="/signup" component={SignUp} />
        <Route path="/videos/:videoId" component={Main} />
        <Route path="/videos" component={Videos} />
        <Route path="/">Sorry that was not found</Route>
      </Switch>
    </Router>
  );
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(MainRoutes);
