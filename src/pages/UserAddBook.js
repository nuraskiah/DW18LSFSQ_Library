import React from 'react';
import FormAddBook from '../components/FormAddBook';

function AdminAddBook() {
  return (
    <div className="add-book">
      <h2 className="heading">Add Book</h2>
      <FormAddBook type="user" />
      <br />
      <br />
    </div>
  );
}

export default AdminAddBook;
