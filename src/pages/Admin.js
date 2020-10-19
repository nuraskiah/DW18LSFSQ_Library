import React, { useState } from 'react';
import { Table, DropdownButton, Dropdown } from 'react-bootstrap';
import { BsChevronLeft } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { API } from '../config/config';

import UserBooksList from '../components/UserBooksList';

const Admin = () => {
  const [selected, setSelected] = useState('');

  const { isLoading, data, refetch } = useQuery('getBooks', () =>
    API.get('/books')
  );

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="admin">
      <div class="admin-wrapper">
        <DropdownButton
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <BsChevronLeft size="18px" className="mr-1" />
              Status
            </div>
          }
          id="dropdown"
          drop="left"
          variant="light"
          onSelect={(e) => {
            setSelected(e);
            console.log(selected);
          }}
        >
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
          <Dropdown.Item eventKey="Approved">Approved</Dropdown.Item>
          <Dropdown.Item eventKey="Pending">Waiting</Dropdown.Item>
          <Dropdown.Item eventKey="Rejected">Cancel</Dropdown.Item>
        </DropdownButton>

        <h2 className="bold">Book Verification</h2>
        <Table hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Users or Author</th>
              <th>ISBN</th>
              <th>E-book</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.data.data
              .filter((book) => {
                if (selected !== 'All') return book.status.includes(selected);
                else return book;
              })
              .map((book, index) => (
                <UserBooksList
                  no={index + 1}
                  bookId={book.id}
                  title={book.title}
                  isbn={book.isbn}
                  ebook={book.file}
                  status={book.status}
                  refetchBooks={refetch}
                />
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Admin;
