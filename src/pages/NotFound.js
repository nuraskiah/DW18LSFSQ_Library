import React from 'react';
import image from '../assets/images/13.png';

const NotFound = () => {
  return (
    <div className="landing">
      <img
        src={image}
        alt="not-found"
        className="landing-image"
        style={{ right: '0', zIndex: '1 !important' }}
      />
      <div className="lib-container">
        <h1>
          <span className="italic tnr">Oops!</span>
        </h1>
        <p className="landing-text mb-4">
          Sorry, we can't find the page that you are looking for :(
        </p>
      </div>
    </div>
  );
};

export default NotFound;
