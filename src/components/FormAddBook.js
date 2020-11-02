import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { BiBookAdd } from 'react-icons/bi';
import { CgAttachment, CgOverflow } from 'react-icons/cg';
import CKEditor from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import AlertModal from './AlertModal';
import Loading from './Loading';
import BeatLoader from 'react-spinners/BeatLoader';

import { API } from '../config/config';
import { useQuery, useMutation } from 'react-query';
import { Context } from '../context/Context';
import ImageCropper from './Cropper/ImageCropper';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

const FormAddBook = (props) => {
  const [state] = useContext(Context);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publication: '',
    CategoryId: '',
    pages: '',
    isbn: '',
    about: '',
    cover: '',
    file: '',
  });

  const [fileName, setFileName] = useState('');

  const {
    title,
    publication,
    CategoryId,
    pages,
    isbn,
    about,
    file,
    cover,
  } = formData;

  let { author } = formData;

  const { isLoading, error, data } = useQuery('getCategories', () =>
    API.get('/categories')
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [addBook] = useMutation(async () => {
    setShowErrorAlert(false);

    let status = 'Approved';
    const UserId = state.user.id;
    if (props.type === 'user') {
      author = state.user.fullName;
      status = 'Pending';
    }

    const formData = new FormData();

    formData.append('title', title);
    formData.append('author', author);
    formData.append('publication', publication);
    formData.append('CategoryId', CategoryId);
    formData.append('UserId', UserId);
    formData.append('pages', pages);
    formData.append('isbn', isbn);
    formData.append('about', about);
    formData.append('cover', blob);
    formData.append('file', file);
    formData.append('status', status);

    try {
      setLoading(true);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await API.post('/book', formData, config);
      setLoading(false);
      setShowSuccessAlert(true);
      setFormData({
        title: '',
        author: '',
        publication: '',
        CategoryId: '',
        pages: '',
        isbn: '',
        about: '',
        cover: '',
        file: '',
      });
      setFileName('');
      setShowErrorAlert(false);
    } catch (error) {
      console.log(error.response.data.message);
      console.log(error);
      setErrorMessage(error.response.data.message);
      setShowErrorAlert(true);
    }
    setLoading(false);
  });

  const [blob, setBlob] = useState(null);

  const getBlob = (blob) => {
    setBlob(blob);
  };

  const handleCoverChange = (e) => {
    if (
      e.target.files &&
      e.target.files.length > 0 &&
      e.target.files[0].type.match('image')
    ) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener(
        'load',
        () => {
          setFormData({
            ...formData,
            cover: reader.result,
          });
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (e) => {
    setLoading(false);
    e.preventDefault();

    addBook();
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div>
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
        {props.type === 'admin' && (
          <Form.Group>
            <Form.Control
              type="text"
              value={author}
              name="author"
              required
              placeholder="Author"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
        )}
        <Form.Group>
          <Form.Control
            type="text"
            value={publication}
            name="publication"
            placeholder="Publication Date"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="select"
            name="CategoryId"
            value={CategoryId}
            onChange={(e) => handleChange(e)}
            required
          >
            <option value={null}>Category</option>
            {data.data.data.map((category, i) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </Form.Control>
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
          {/* <CKEditor
            editor={InlineEditor}
            className="form-control"
            data={about}
            style={{ height: 200 }}
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              //console.log("Editor is ready to use!", editor);
              editor.editing.view.change((writer) => {
                writer.setStyle(
                  'height',
                  '200px',
                  editor.editing.view.document.getRoot()
                );
              });
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFormData({
                ...formData,
                about: data,
              });
            }}
          /> */}
        </Form.Group>

        <Form.Group>
          <Form.File
            id="custom-file-translate-html"
            name="ebook"
            accept="image/*"
            label={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {fileName ? fileName : 'Attach Book Cover'}
                <CgAttachment size="20px" className="ml-1" />
              </div>
            }
            onChange={(e) => {
              handleCoverChange(e);
              setFileName(
                !e.target.files[0] ? fileName : e.target.files[0].name
              );
            }}
            custom
          />
        </Form.Group>

        <Form.Group>
          <Form.File
            id="custom-file-translate-html"
            name="ebook"
            accept=".epub"
            label={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {file ? file.name : 'Attach Book File'}
                <CgAttachment size="20px" className="ml-1" />
              </div>
            }
            onChange={(e) => {
              setFormData({
                ...formData,
                file: !e.target.files[0] ? file : e.target.files[0],
              });
            }}
            custom
          />
        </Form.Group>

        <Alert variant="danger" show={showErrorAlert}>
          {errorMessage}
        </Alert>

        {cover && (
          <ImageCropper
            getBlob={getBlob}
            inputImg={cover}
            aspect={27 / 20}
            shape="rect"
            size={{ width: 200, height: 270 }}
            resize={{ width: 400, height: 540 }}
          />
        )}

        <Button variant="light" type="submit" className="primary float-right">
          {loading ? (
            <BeatLoader
              css={override}
              size={5}
              color={'#ffffff'}
              loading={loading}
            />
          ) : (
            <>
              Add Book <BiBookAdd size="20px" />
            </>
          )}
        </Button>
      </Form>

      <AlertModal
        show={showSuccessAlert}
        onHide={() => setShowSuccessAlert(false)}
        label={
          props.type === 'admin'
            ? 'Book added successfully'
            : 'Thank you for adding your own book to our website, please wait 1 x 24 hours to verify whether this book is your writing'
        }
      />
    </div>
  );
};

export default FormAddBook;
