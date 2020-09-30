import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import NavBar from '../components/NavBar';

function Home() {
  return (
    <div className="home">
      <h1>Name</h1>
      <h2>Lib</h2>
    </div>
  );
}

export default Home;
