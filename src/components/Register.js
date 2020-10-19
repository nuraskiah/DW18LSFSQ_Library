import React, { useState, useContext } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Context } from '../context/Context';
import { Formik } from 'formik';
import * as yup from 'yup';

import BeatLoader from 'react-spinners/BeatLoader';

import { API, setToken } from '../config/config';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  fullName: yup.string().min(3).required(),
  gender: yup.string().min(4).required(),
  phone: yup.string().min(6).required(),
  address: yup.string().min(6).required(),
});

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

const Register = (props) => {
  const [show, setShow] = useState(false);
  const [exist, setExist] = useState('');
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useContext(Context);
  const history = useHistory();

  const handleSubmit = async (values) => {
    setExist(false);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { email, password, fullName, gender, phone, address } = values;

    const body = JSON.stringify({
      email,
      password,
      fullName,
      gender,
      phone,
      address,
    });

    try {
      setLoading(true);
      const { data } = await API.post('/register', body, config);
      console.log(data);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: data.data,
      });

      setToken(data.data.token);
      setExist(false);

      try {
        const { data } = await API.get('/validate');

        dispatch({
          type: 'GET_USER',
          payload: data.data,
        });
      } catch (error) {
        dispatch({
          type: 'AUTH_ERROR',
        });
      }

      history.push('/home');
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILED',
      });
      setExist(true);
    }
    setLoading(false);
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

        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          initialValues={{
            email: '',
            password: '',
            fullName: '',
            gender: '',
            phone: '',
            address: '',
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Control
                  type="email"
                  value={values.email}
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  isValid={touched.email && !errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <InputGroup controlId="password" className="mb-3">
                <Form.Control
                  type={show ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  isValid={touched.password && !errors.password}
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
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
              <Form.Group controlId="name">
                <Form.Control
                  type="text"
                  value={values.fullName}
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  isInvalid={!!errors.fullName}
                  isValid={touched.fullName && !errors.fullName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fullName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="gender">
                <Form.Control
                  as="select"
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  isInvalid={!!errors.gender}
                  isValid={touched.gender && !errors.gender}
                >
                  <option>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.gender}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Control
                  type="text"
                  value={values.phone}
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                  isValid={touched.phone && !errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Control
                  type="text"
                  value={values.address}
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                  isInvalid={!!errors.address}
                  isValid={touched.address && !errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>

              {exist ? (
                <p
                  className="text-danger italic text-center"
                  style={{ fontSize: '13px' }}
                >
                  Your account already exist, please try to login
                </p>
              ) : (
                <br />
              )}

              <Button variant="light" type="submit" block className="primary">
                {loading ? (
                  <BeatLoader
                    css={override}
                    size={5}
                    color={'#ffffff'}
                    loading={loading}
                  />
                ) : (
                  'Sign In'
                )}
              </Button>
            </Form>
          )}
        </Formik>
        <p className="account mt-3">
          Already have an account? Click{' '}
          <span className="here" onClick={props.haveAcc}>
            here
          </span>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default Register;
