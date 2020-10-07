import React, { useState } from 'react';
import img from '../assets/images/book-jumbotron.png';
import books from '../datas/books.json';
import { BsChevronLeft } from 'react-icons/bs';

import { DropdownButton, Dropdown, Row, Col } from 'react-bootstrap';

import Book from '../components/Book';

function List() {
  const [selected, setSelected] = useState('All');

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  let dropdownItem = books
    .map((book) => book.category)
    .filter(onlyUnique)
    .map((category) => {
      return <Dropdown.Item eventKey={category}>{category}</Dropdown.Item>;
    });

  let bookList = '';

  if (selected === 'All') {
    bookList = books.map((book, i) => {
      return (
        <Book
          id={book.id}
          cover={book.cover}
          title={book.title}
          author={book.author}
          key={i}
        />
      );
    });
  } else {
    bookList = books
      .filter((book) => book.category === selected)
      .map((book, i) => {
        return (
          <Book
            id={book.id}
            cover={book.cover}
            title={book.title}
            author={book.author}
            key={i}
          />
        );
      });
  }

  return (
    <>
      <Jumbotron />

      <div className="main-container mt-5">
        <DropdownButton
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <BsChevronLeft size="18px" className="mr-1" />
              Categories
            </div>
          }
          id="dropdown"
          drop="left"
          variant="light"
          onSelect={(e) => {
            setSelected(e);
          }}
        >
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
          {dropdownItem}
        </DropdownButton>

        <h2 className="heading">Books List</h2>

        <div className="book-list">{bookList}</div>
      </div>
    </>
  );
}

const Jumbotron = () => {
  return (
    <div className="mb-3 jumbotron" style={{ padding: '30px 80px' }}>
      <Row noGutters style={{ display: 'flex', alignItems: 'center' }}>
        <Col md={8}>
          <h1 className="tnr bold" style={{ fontSize: 96, lineHeight: '1em' }}>
            Share, read and <span className="italic tnr bold">love</span>
          </h1>
          <p className="dh">Reading is fascinating</p>
        </Col>
        <Col md={4}>
          <img src={img} alt="backdrop" />
        </Col>
      </Row>
    </div>
  );
};

export default List;
