import React from 'react';
import AddBook from './AddBook';
import { Form, Button } from 'react-bootstrap';
import { BiBookAdd } from 'react-icons/bi';

function AdminAddBook() {
  return (
    <div className="admin">
      <div class="admin-wrapper">
        <AddBook />
        <br />
        <br />
      </div>
    </div>
  );
}

export default AdminAddBook;
