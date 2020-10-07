import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import userBooks from '../datas/userBooks.json';
import Book from '../components/Book';

// Icon
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { FaTransgender, FaPhoneAlt } from 'react-icons/fa';

const Profile = () => {
  return (
    <>
      <MyProfile />
      <br />
      <br />
      <MyBooks />
    </>
  );
};

function MyProfile() {
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
                    <p className="bold">email@email.com</p>
                    <p className="grey">Email</p>
                  </Col>
                </Row>
                <Row className="data">
                  <Col md={1}>
                    <FaTransgender size="30px" className="grey" />
                  </Col>
                  <Col>
                    <p className="bold">Male</p>
                    <p className="grey">Gender</p>
                  </Col>
                </Row>
                <Row className="data">
                  <Col md={1}>
                    <FaPhoneAlt size="25px" className="grey" />
                  </Col>
                  <Col>
                    <p className="bold">0812 3234 8578</p>
                    <p className="grey">Mobile phone</p>
                  </Col>
                </Row>
                <Row className="data">
                  <Col md={1}>
                    <MdLocationOn size="30px" className="grey" />
                  </Col>
                  <Col>
                    <p className="bold">Tangerang</p>
                    <p className="grey">Address</p>
                  </Col>
                </Row>
              </Col>
              <Col md="auto">
                <div
                  style={{
                    width: 200,
                    height: 200,
                    backgroundColor: 'teal',
                  }}
                ></div>
                <br />
                <Button variant="light" className="primary" blocked>
                  Change Profile Photo
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

function MyBooks() {
  return (
    <div className="my-books">
      <h2 className="heading">My Books</h2>
      <div className="book-list mt-3">
        {userBooks.map((book, i) => {
          return (
            <div style={{ position: 'relative' }}>
              {!book.verified && (
                <div
                  class="overlay"
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: '-5px',
                    bottom: '-5px',
                    left: '-5px',
                    right: '-5px',
                    zIndex: '10',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderRadius: 10,
                  }}
                >
                  <p className="text-center text-warning">
                    Waiting to be verified
                  </p>
                </div>
              )}
              <Book
                id={book.id}
                cover={book.cover}
                title={book.title}
                author={book.author}
                key={i}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
