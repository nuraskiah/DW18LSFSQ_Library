import React, { Component, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactModal from 'react-modal';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Login(props) {
  const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    },
  };

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4 className="mb-4">Sign In</h4>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <br />
            <Link to="/home">
              <Button type="submit" block className="primary">
                Sign In
              </Button>
            </Link>
            <p>Don't have an account? Click here</p>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
