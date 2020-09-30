import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login(props) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4 className="mb-4 sign">Sign In</h4>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
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
                <InputGroup.Text
                  id="basic-addon2"
                  onClick={() => setShow(!show)}
                  style={{ width: 46 }}
                >
                  {show ? (
                    <i class="far fa-eye"></i>
                  ) : (
                    <i class="far fa-eye-slash"></i>
                  )}
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <br />
            <Link to="/home" style={{ textDecoration: 'none' }}>
              <Button variant="light" type="submit" block className="primary">
                Sign In
              </Button>
            </Link>
          </Form>
          <p className="account mt-3">
            Don't have an account? Click{' '}
            <span className="here" onClick={props.noAcc}>
              here
            </span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
