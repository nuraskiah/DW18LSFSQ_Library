import React, { useState, useContext } from 'react';
import { Context } from '../context/Context';
import { Row, Col, Button, Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { API } from '../config/config';

import Book from './Book';
import Loading from './Loading';
import Edit from './Modal/Edit';
import Prompt from './Modal/Prompt';

const MyBooks = () => {
  const [state] = useContext(Context);
  const { id } = state.user;

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { isLoading, data, refetch } = useQuery('getUserBooks', () =>
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
              {/* <div className="book-action"></div> */}

              {book.status !== 'Approved' && (
                <div
                  className="overlay"
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
                edit={book}
                refetchBook={refetch}
                key={i}
                profile={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
