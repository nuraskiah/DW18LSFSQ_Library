import React, { Component, useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Register(props) {
  const [show, setShow] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4 className="mb-4">Sign Up</h4>
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Form.Group controlId="email">
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>
          <InputGroup controlId="password" className="mb-3">
            <Form.Control
              type={show ? 'text' : 'password'}
              placeholder="Password"
            />
            <InputGroup.Append>
              <InputGroup.Text id="basic-addon2" onClick={() => setShow(!show)}>
                @
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <Form.Group controlId="name">
            <Form.Control type="text" placeholder="Full Name" />
          </Form.Group>
          <Form.Group controlId="gender">
            <Form.Control as="select">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Control type="text" placeholder="Phone" />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Control type="text" placeholder="Address" />
          </Form.Group>
          <br />
          <Link to="/home">
            <Button type="submit" block className="primary">
              Sign Up
            </Button>
          </Link>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Register;
