import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from '../context/Context';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(Context);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.isLogin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export const AdminRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(Context);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.isAdmin ? <Component {...props} /> : <Redirect to="/home" />
      }
    />
  );
};
