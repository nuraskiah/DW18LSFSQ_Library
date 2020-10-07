import React, { useState, useContext } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Context } from '../context/Context';

function Register(props) {
  const [show, setShow] = useState(false);
  const [state, dispatch] = useContext(Context);
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    gender: '',
    phone: '',
    address: '',
  });

  const { email, password, name, gender, phone, address } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch({
      type: 'LOGIN',
    });
    console.log('Login Berhasil');
    history.push('/home');
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4 className="mb-4 sign">Sign Up</h4>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              value={email}
              name="email"
              placeholder="Email"
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Group>
          <InputGroup controlId="password" className="mb-3">
            <Form.Control
              type={show ? 'text' : 'password'}
              value={password}
              name="password"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
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
            <Form.Control
              type="text"
              value={name}
              name="name"
              placeholder="Full Name"
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Group>
          <Form.Group controlId="gender">
            <Form.Control
              as="select"
              name="gender"
              value={gender}
              onChange={(e) => handleChange(e)}
              required
            >
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Control
              type="number"
              value={phone}
              name="phone"
              placeholder="Phone"
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Control
              type="text"
              value={address}
              name="address"
              placeholder="Address"
              onChange={(e) => handleChange(e)}
              required
            />
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
