import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import landingImage from '../assets/images/Vector 1.png';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from './Home';

function Landing() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="landing">
      <img src={landingImage} className="landing-image" />
      <div className="lib-container">
        <h1>
          <span className="italic">Your</span> library anywhere
        </h1>
        <p className="landing-text mb-4">
          Sign-up today and receive unlimited access to all of your reading -
          share your book.
        </p>
        <div className="buttons">
          <button
            className="btn primary"
            onClick={() => setShowRegisterModal(true)}
          >
            Sign Up
          </button>
          <button
            className="btn btn-light"
            onClick={() => setShowLoginModal(true)}
          >
            Sign In
          </button>
          <Login
            show={showLoginModal}
            onHide={() => setShowLoginModal(false)}
          />
          <Register
            show={showRegisterModal}
            onHide={() => setShowRegisterModal(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
