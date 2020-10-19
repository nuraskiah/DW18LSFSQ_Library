import React from 'react';
import FormAddBook from '../components/FormAddBook';

function AdminAddBook() {
  return (
    <div className="admin">
      <div class="admin-wrapper">
        <h2 className="bold mb-3">Add Book</h2>
        <FormAddBook type="admin" />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default AdminAddBook;
