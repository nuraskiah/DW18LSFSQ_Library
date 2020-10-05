import React, { useState } from 'react';
import { Row, Col, Button, Modal, Alert } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { BsBookmarkPlus, BsChevronRight } from 'react-icons/bs';
import books from '../datas/books.json';

import AlertModal from '../components/AlertModal';

const Detail = () => {
  const { id } = useParams();
  const book = books.filter((book) => book.id == id)[0];

  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="detail-container">
      <Row>
        <Col md={5}>
          <img
            src={book.cover}
            alt="cover"
            style={{
              width: '400px',
              height: '540px',
              borderRadius: '10px',
            }}
          />
        </Col>

        <Col md={7} className="pl-5">
          <h2
            className="tnr bold mb-0"
            style={{ fontSize: 64, lineHeight: '1em' }}
          >
            {book.title}
          </h2>
          <p className="mt-3">{book.author}</p>
          <br />

          <DetailItem name="Publication date" data={book.date} />
          <DetailItem name="Category" data={book.category} />
          <DetailItem name="Pages" data={book.pages} />
          <DetailItem name="ISBN" data={book.isbn} style="text-danger" />
        </Col>
      </Row>
      <br />
      <hr />
      <br />
      <Row>
        <Col>
          <h3 className="bold mb-4">About This Book</h3>
          <p className="text-justify">{book.detail}</p>
          <br />
          <br />
          <Link to="/read">
            <Button variant="light" className="float-right">
              Read Book <BsChevronRight size="20px" />
            </Button>
          </Link>
          <Button
            variant="light"
            className="primary mr-3 float-right"
            onClick={() => {
              setShowAlert(true);
            }}
          >
            Add to Library <BsBookmarkPlus size="20px" />
          </Button>
        </Col>
      </Row>

      <AlertModal
        show={showAlert}
        onHide={() => setShowAlert(false)}
        label="Your book has been added successfully"
      />
    </div>
  );
};

const DetailItem = ({ name, data, style }) => {
  const classs = `bold dh ${style}`;
  return (
    <div className="detail">
      <p className={classs}>{name}</p>
      <p className="dd">{data}</p>
    </div>
  );
};

export default Detail;
