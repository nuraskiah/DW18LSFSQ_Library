import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { BiBookAdd } from 'react-icons/bi';

function AdminAddBook() {
  return (
    <div className="admin mb-3">
      <h2 className="bold">Add Book</h2>
      <Form>
        <Form.Group>
          <Form.Control type="text" placeholder="Title" />
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" placeholder="Publication Date" />
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" placeholder="Category" />
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" placeholder="Pages" />
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" placeholder="ISBN" />
        </Form.Group>
        <Form.Group>
          <Form.Control as="textarea" rows={5} placeholder="About This Book" />
        </Form.Group>
        <Form.Group>
          <Form.File id="exampleFormControlFile1" />
        </Form.Group>
        <Button variant="light" className="primary float-right">
          Add Book <BiBookAdd />
        </Button>
      </Form>
      <br />
      <br />
      <br />
    </div>
  );
}

export default AdminAddBook;
