import React from 'react';
import { ContextProvider } from './context/Context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import './App.css';

// components
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import { PrivateRoute, AdminRoute } from './components/PrivateRoute';

// pages
import Landing from './pages/Landing';
import Admin from './pages/Admin';
import AdminAddBook from './pages/AdminAddBook';
import Read from './pages/Read';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Profile from './pages/Profile';
import MyLibrary from './pages/MyLibrary';
import AddBook from './pages/AddBook';

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
    component: AddBook,
  },
  {
    path: '/detail/:id',
    component: Detail,
  },
];

function App() {
  return (
    <ContextProvider>
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/" component={Landing} />
          <AdminRoute exact path="/admin" component={Admin} />
          <AdminRoute exact path="/admin/add-book" component={AdminAddBook} />
          <PrivateRoute path="/read" component={Read} />
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
    </ContextProvider>
  );
}

export default App;
