import React, { useState, useContext } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/Context';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import users from '../datas/users.json';

function Login(props) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const [exist, setExist] = useState('');
  const [state, dispatch] = useContext(Context);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    users.map((user) => {
      if (email === user.email && password === user.password) {
        setExist(true);
        if (user.admin) {
          dispatch({
            type: 'ADMIN',
          });
        }
        dispatch({
          type: 'LOGIN',
        });
        history.push('/home');
      }
    });

    setExist(false);
  }

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
              handleSubmit(e);
            }}
          >
            <Form.Group controlId="email">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
            </Form.Group>
            <InputGroup controlId="password" className="mb-3">
              <Form.Control
                type={show ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                required
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
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

            {exist === false ? (
              <p
                className="text-danger italic text-center"
                style={{ fontSize: '13px' }}
              >
                You have entered an invalid email or password
              </p>
            ) : (
              <br />
            )}

            <Button variant="light" type="submit" block className="primary">
              Sign In
            </Button>
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
