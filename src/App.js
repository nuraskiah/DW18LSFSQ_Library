import React, { useContext, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { API, setToken } from './config/config';
import { Context } from './context/Context';
import './App.css';

// components
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import { PrivateRoute, AdminRoute } from './components/PrivateRoute';

// pages
import Landing from './pages/Landing';
import Dashboard from './pages/Admin/Dashboard';
import VerifyBook from './pages/Admin/VerifyBook';
import AdminAddBook from './pages/Admin/AddBook';
import Read from './pages/Read';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Profile from './pages/Profile';
import MyLibrary from './pages/MyLibrary';
import UserAddBook from './pages/UserAddBook';

const routes = [
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/my-library',
    component: MyLibrary,
  },
  {
    path: '/add-book',
    component: UserAddBook,
  },
  {
    path: '/detail/:id',
    component: Detail,
  },
];

if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await API.get('/validate');

        dispatch({
          type: 'GET_USER',
          payload: data.data,
        });
      } catch (error) {
        dispatch({
          type: 'AUTH_ERROR',
        });
      }
    };

    loadUser();
  }, []);

  return (
    <Router>
      <NavBar />

      <Switch>
        <Route exact path="/" component={Landing} />
        <AdminRoute exact path="/admin" component={Dashboard} />
        <AdminRoute exact path="/admin/verify-book" component={VerifyBook} />
        <AdminRoute exact path="/admin/add-book" component={AdminAddBook} />
        <PrivateRoute exact path="/read/:id" component={Read} />
        <Route
          path={['/home', '/profile', '/my-library', '/detail', '/add-book']}
        >
          <div className="home mb-5">
            <Row>
              <Col md={3} style={{ zIndex: '1 !important' }}>
                <Sidebar />
              </Col>
              <Col md={9} className="p-0" style={{ zIndex: 4 }}>
                <Switch>
                  {routes.map(({ path, component }, key) => {
                    return (
                      <PrivateRoute
                        exact
                        path={path}
                        component={component}
                        key={key}
                      />
                    );
                  })}
                </Switch>
              </Col>
            </Row>
            <br />
            <br />
          </div>
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
