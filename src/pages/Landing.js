import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/Context';
import landingImage from '../assets/images/Vector 1.png';
import Login from '../components/Login';
import Register from '../components/Register';

function Landing() {
  const [state, dispatch] = useContext(Context);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const history = useHistory();

  return (
    <div className="landing">
      <img src={landingImage} className="landing-image" />
      <div className="lib-container">
        <h1>
          <span className="italic tnr">Your</span> library anywhere
        </h1>
        <p className="landing-text">
          Sign-up today and receive unlimited access to all of your reading -
          share your book.
        </p>

        <div className="buttons">
          {state.isLogin ? (
            <button
              className="btn lg primary mr-4"
              onClick={() => history.push('/home')}
            >
              Home
            </button>
          ) : (
            <>
              <button
                className="btn lg primary mr-4"
                onClick={() => setShowRegisterModal(true)}
              >
                Sign Up
              </button>
              <button
                className="btn lg light"
                onClick={() => setShowLoginModal(true)}
              >
                Sign In
              </button>
            </>
          )}
          <Login
            show={showLoginModal}
            onHide={() => setShowLoginModal(false)}
            noAcc={() => {
              setShowLoginModal(false);
              setShowRegisterModal(true);
            }}
          />
          <Register
            show={showRegisterModal}
            onHide={() => setShowRegisterModal(false)}
            haveAcc={() => {
              setShowRegisterModal(false);
              setShowLoginModal(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
