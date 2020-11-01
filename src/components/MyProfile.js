import React, { useState, useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Context } from '../context/Context';

import ChangeProfilePhoto from '../components/ChangeProfilePhoto';

import { MdEmail, MdLocationOn } from 'react-icons/md';
import { FaTransgender, FaPhoneAlt } from 'react-icons/fa';

const MyProfile = () => {
  const [state] = useContext(Context);
  const [showEditModal, setShowEditModal] = useState(false);
  const { email, gender, phone, address, photo } = state.user;
  return (
    <div className="profile-container">
      <Row>
        <Col>
          <h2 className="heading">Profile</h2>
          <div className="data-container">
            <Row noGutters="true">
              <Col className="datas">
                <Row className="data">
                  <Col md={1}>
                    <MdEmail size="30px" className="grey" />
                  </Col>
                  <Col>
                    <p className="bold">{email}</p>
                    <p className="grey">Email</p>
                  </Col>
                </Row>
                <Row className="data">
                  <Col md={1}>
                    <FaTransgender size="30px" className="grey" />
                  </Col>
                  <Col>
                    <p className="bold">{gender}</p>
                    <p className="grey">Gender</p>
                  </Col>
                </Row>
                <Row className="data">
                  <Col md={1}>
                    <FaPhoneAlt size="25px" className="grey" />
                  </Col>
                  <Col>
                    <p className="bold">{phone}</p>
                    <p className="grey">Mobile phone</p>
                  </Col>
                </Row>
                <Row className="data">
                  <Col md={1}>
                    <MdLocationOn size="30px" className="grey" />
                  </Col>
                  <Col>
                    <p className="bold">{address}</p>
                    <p className="grey">Address</p>
                  </Col>
                </Row>
              </Col>
              <Col md="auto">
                <img
                  src={photo}
                  alt="photo"
                  style={{
                    width: 200,
                    height: 200,
                    objectFit: 'cover',
                  }}
                />
                <br />
                <Button
                  variant="light"
                  className="primary"
                  blocked
                  onClick={() => setShowEditModal(true)}
                >
                  Change Profile Photo
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <ChangeProfilePhoto
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onSubmit={() => setShowEditModal(false)}
      />
    </div>
  );
};

export default MyProfile;
