import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { BiBookAdd } from 'react-icons/bi';
import { CgAttachment } from 'react-icons/cg';
import AlertModal from '../components/AlertModal';

function AddBook() {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="add-book">
      <h2 className="bold mb-3">Add Book</h2>
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
        {/* <Form.Group>
          <Form.File id="exampleFormControlFile1" />
        </Form.Group> */}
        <div
          className="form-control"
          style={{ width: 'max-content', color: '#6d6d6d' }}
        >
          Attach File <CgAttachment size="20px" />
        </div>
      </Form>

      <Button
        variant="light"
        className="primary float-right"
        onClick={() => {
          setShowAlert(true);
        }}
      >
        Add Book <BiBookAdd size="20px" />
      </Button>

      <AlertModal
        show={showAlert}
        onHide={() => setShowAlert(false)}
        label="Thank you for adding your own books to our website, please wait 1 x 24 hours to verify whether this book is your writing"
      />
    </div>
  );
}

export default AddBook;
