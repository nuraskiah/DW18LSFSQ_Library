import React, { useState } from 'react';
import img from '../assets/images/book-jumbotron.png';
// import books from '../datas/books.json';
import { BsChevronLeft } from 'react-icons/bs';

import { API } from '../config/config';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

import { DropdownButton, Dropdown, Row, Col, Carousel } from 'react-bootstrap';

import Book from '../components/Book';
import Loading from '../components/Loading';

function List() {
  const [selected, setSelected] = useState('All');
  const history = useHistory();

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const { isLoading, data } = useQuery('getBooks', () => API.get('/books'));

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="mb-3 jumbotron">
        <Row noGutters style={{ display: 'flex', alignItems: 'center' }}>
          <Col md={8}>
            <h1
              className="tnr bold"
              style={{ fontSize: 96, lineHeight: '1em' }}
            >
              Share, read and <span className="italic tnr bold">love</span>
            </h1>
            <p className="dh">Reading is fascinating</p>
          </Col>
          <Col md={4}>
            {/* <img src={img} alt="backdrop" /> */}
            <div
              style={{
                borderRadius: 10,
                overflow: 'hidden',
                width: 290,
                height: 391.5,
              }}
            >
              <Carousel controls={false} interval={3500} indicators={false}>
                {data.data.data
                  .filter((book) => book.status === 'Approved')
                  .slice(0, 5)
                  .map((book) => (
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={book.cover}
                        alt={book.title}
                        style={{ objectFit: 'cover', cursor: 'pointer' }}
                        onClick={() => history.push(`/detail/${book.id}`)}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
          </Col>
        </Row>
      </div>

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
          {data.data.data
            .filter((book) => book.status === 'Approved')
            .map((book) => book.category.name)
            .filter(onlyUnique)
            .sort()
            .map((category) => {
              return (
                <Dropdown.Item eventKey={category}>{category}</Dropdown.Item>
              );
            })}
        </DropdownButton>

        <h2 className="heading">Books List</h2>

        <div className="book-list">
          {data.data.data
            .filter((book) => {
              if (selected !== 'All')
                return (
                  book.category.name === selected && book.status === 'Approved'
                );
              else return book.status === 'Approved';
            })
            .map((book, i) => (
              <Book
                id={book.id}
                cover={book.cover}
                title={book.title}
                author={book.author}
                key={i}
              />
            ))}
        </div>
      </div>
    </>
  );
}

// const Jumbotron = () => {
//   return (

//   );
// };

export default List;
