import React, { useState, useContext } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Context } from '../context/Context';

function Register(props) {
  const [show, setShow] = useState(false);
  const [state, dispatch] = useContext(Context);
  const history = useHistory();

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4 className="mb-4 sign">Sign Up</h4>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({
              type: 'LOGIN',
            });
            console.log('Login Berhasil');
            history.push('/home');
          }}
        >
          <Form.Group controlId="email">
            <Form.Control type="email" placeholder="Email" required />
          </Form.Group>
          <InputGroup controlId="password" className="mb-3">
            <Form.Control
              type={show ? 'text' : 'password'}
              placeholder="Password"
              required
            />
            <InputGroup.Append>
              <InputGroup.Text
                id="basic-addon2"
                onClick={() => setShow(!show)}
                style={{ width: 46 }}
              >
                {show ? (
                  <AiOutlineEye size="20px" />
                ) : (
                  <AiOutlineEyeInvisible size="20px" />
                )}
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <Form.Group controlId="name">
            <Form.Control type="text" placeholder="Full Name" required />
          </Form.Group>
          <Form.Group controlId="gender">
            <Form.Control as="select" required>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Control type="number" placeholder="Phone" required />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Control type="text" placeholder="Address" required />
          </Form.Group>
          <br />
          <Button variant="light" type="submit" block className="primary">
            Sign Up
          </Button>
        </Form>
        <p className="account mt-3">
          Don't have an account? Click{' '}
          <span className="here" onClick={props.haveAcc}>
            here
          </span>
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default Register;
