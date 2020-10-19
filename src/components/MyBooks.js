import React, { useContext } from 'react';
import { Context } from '../context/Context';
import { Row, Col, Button } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { API } from '../config/config';

import Book from '../components/Book';
import Loading from '../components/Loading';

const MyBooks = () => {
  const [state] = useContext(Context);
  const { id } = state.user;

  const { isLoading, data } = useQuery('getUserBooks', () =>
    API.get(`/user-books/${id}`)
  );

  return (
    <div className="my-books">
      <h2 className="heading">My Books</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="book-list mt-3">
          {data.data.data.map((book, i) => (
            <div style={{ position: 'relative' }}>
              {book.status !== 'Approved' && (
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
                  {book.status === 'Pending' ? (
                    <p className="text-center text-warning">
                      Waiting to be verified
                    </p>
                  ) : (
                    <p className="text-center text-danger">Rejected</p>
                  )}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
