import React from 'react';
import FormAddBook from '../../components/FormAddBook';

function AdminAddBook() {
  return (
    <div className="admin">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body {
              background-color: #f9f9f9;
            }`,
        }}
      />

      <h2 className="bold mb-3">Add Book</h2>
      <FormAddBook type="admin" />
    </div>
  );
}

export default AdminAddBook;
