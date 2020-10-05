import React from 'react';
import { Modal, Alert } from 'react-bootstrap';

const pStyle = {
  margin: '0',
  textAlign: 'center',
  fontSize: 20,
  padding: '10px 30px',
  color: '#469f74',
};

const AlertModal = (props) => {
  return (
    <Modal {...props} size="lg" centered id="addSuccess">
      <Alert
        variant="success"
        style={{ margin: '0', backgroundColor: 'white' }}
      >
        <p style={pStyle}>{props.label}</p>
      </Alert>
    </Modal>
  );
};

export default AlertModal;
