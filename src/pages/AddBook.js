import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { BiBookAdd } from 'react-icons/bi';
import { CgAttachment } from 'react-icons/cg';
import AlertModal from '../components/AlertModal';

function AddBook() {
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    category: '',
    pages: '',
    isbn: '',
    about: '',
    cover: 'Attach Book Cover',
    file: 'Attach Book File',
  });

  const { title, date, category, pages, isbn, about, file, cover } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData.file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
    console.log(formData);
  };

  return (
    <div className="add-book">
      <h2 className="heading">Add Book</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Control
            type="text"
            value={title}
            name="title"
            required
            placeholder="Title"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            value={date}
            name="date"
            placeholder="Publication Date"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            value={category}
            name="category"
            placeholder="Category"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="number"
            value={pages}
            name="pages"
            placeholder="Pages"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="number"
            value={isbn}
            name="isbn"
            placeholder="ISBN"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            value={about}
            name="about"
            rows={5}
            placeholder="About This Book"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <File
          onChange={(e) => {
            setFormData({
              ...formData,
              cover: !e.target.files[0].name ? cover : e.target.files[0].name,
            });
          }}
          label={cover}
        />

        <File
          onChange={(e) => {
            setFormData({
              ...formData,
              file: !e.target.files[0].name ? file : e.target.files[0].name,
            });
          }}
          label={file}
        />

        <Button variant="light" type="submit" className="primary float-right">
          Add Book <BiBookAdd size="20px" />
        </Button>
      </Form>

      <AlertModal
        show={showAlert}
        onHide={() => setShowAlert(false)}
        label="Thank you for adding your own books to our website, please wait 1 x 24 hours to verify whether this book is your writing"
      />
    </div>
  );
}

const File = (props) => {
  return (
    <Form.Group>
      <Form.File
        id="custom-file-translate-html"
        name="ebook"
        label={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {props.label}
            <CgAttachment size="20px" className="ml-1" />
          </div>
        }
        onChange={props.onChange}
        custom
      />
    </Form.Group>
  );
};

export default AddBook;
