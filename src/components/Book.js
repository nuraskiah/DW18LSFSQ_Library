import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { API } from '../config/config';

import Edit from './Modal/Edit';
import Prompt from './Modal/Prompt';

function Book({ id, cover, title, author, edit, refetchBook, profile }) {
  const history = useHistory();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <>
      <div className="book">
        {profile && (
          <Dropdown>
            <Dropdown.Toggle className="book-action sq" variant="light">
              <BsThreeDotsVertical color="white" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="right" alignRight>
              <Dropdown.Item
                onClick={() => {
                  setShowEditModal(true);
                }}
              >
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setShowDeleteModal(true);
                }}
              >
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}

        <div onClick={() => history.push(`/detail/${id}`)}>
          <img
            src={cover}
            alt={title}
            className="mb-3"
            style={{ width: 200, height: 270, objectFit: 'cover' }}
          />
          <p
            className="title tnr mb-2"
            style={{
              fontWeight: '700',
              fontSize: 24,
              lineHeight: '29px',
            }}
          >
            {title}
          </p>
          <p className="author grey">{author}</p>
        </div>
      </div>
      {showEditModal && (
        <Edit
          show={showEditModal}
          book={edit}
          onHide={() => setShowEditModal(false)}
          refetch={refetchBook}
        />
      )}
      {showDeleteModal && (
        <Prompt
          show={showDeleteModal}
          action="Delete"
          label={
            <>
              <p className="bold dh m-0">
                Are you sure you want to delete this book?
              </p>
              <p className="m-0">This action can't be undone</p>
            </>
          }
          onHide={() => setShowDeleteModal(false)}
          onAction={async () => {
            await API.delete(`/book/${id}`);
            refetchBook();
          }}
        />
      )}
    </>
  );
}

export default Book;
