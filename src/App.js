import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './App.css';
import NavBar from './components/NavBar';

// pages
import Landing from './pages/Landing';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Landing} />
          <PrivateRoute path="/Home">
            <Home />
          </PrivateRoute>
        </Switch>
      </>
    </Router>
  );
}

const fakeAuth = {
  isAuthenticate: true,
  Authenticated(cb) {
    fakeAuth.isAuthenticate = true;
    setTimeout(cb, 50); //fake Async
  },
  signOut(cb) {
    fakeAuth.isAuthenticate = false;
    setTimeout(cb, 50);
  },
};

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticate ? (
          children
        ) : (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        )
      }
    />
  );
}

export default App;
