import React, { Component } from 'react';
import icon from '../assets/images/student 1.svg';

function NavBar() {
  return (
    <nav>
      <img src={icon} alt="icon" style={{ width: '50px', height: '50px' }} />
      <p>Lib’rary</p>
    </nav>
  );
}

export default NavBar;
