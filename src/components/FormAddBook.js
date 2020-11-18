import React, { useState, useContext } from 'react';
import { useQuery, useMutation } from 'react-query';
import { Form, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import { BiBookAdd } from 'react-icons/bi';
import { CgAttachment, CgOverflow } from 'react-icons/cg';

import CKEditor from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';

import { API } from '../config/config';
import { Context } from '../context/Context';

import AlertModal from './AlertModal';
import Loading from './Loading';
import { ActionLoader } from './Loader';
import ImageCropper from './Cropper/ImageCropper';

const FormAddBook = (props) => {
  const [state] = useContext(Context);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileData, setFileData] = useState({
    cover: '',
    file: '',
  });

  const schema = yup.object({
    title: yup.string().required(),
    author: yup.string().required(),
    publication: yup.string().required(),
    categoryId: yup.number().required(),
    pages: yup.number().required(),
    isbn: yup.number().required(),
    about: yup.string().required(),
  });

  const [fileName, setFileName] = useState('');

  const { cover, file } = fileData;

  const { isLoading, error, data } = useQuery('getCategories', () =>
    API.get('/categories')
  );

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [addBook] = useMutation(async () => {});

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
          setFileData({
            ...fileData,
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

  const handleSubmit = async (values, resetForm) => {
    setLoading(false);

    setShowErrorAlert(false);

    const {
      title,
      author,
      publication,
      categoryId,
      pages,
      isbn,
      about,
    } = values;

    let status = 'Approved';
    const userId = state.user.id;
    if (props.type === 'user') {
      status = 'Pending';
    }

    const formData = new FormData();

    formData.append('title', title);
    formData.append('author', author);
    formData.append('publication', publication);
    formData.append('categoryId', categoryId);
    formData.append('userId', userId);
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
      resetForm();
      setFileName('');
      setFileData({
        ...fileData,
        cover: '',
        file: '',
      });
      setShowErrorAlert(false);
    } catch (error) {
      console.log(error.response.data.message);
      console.log(error);
      setErrorMessage(error.response.data.message);
      setShowErrorAlert(true);
    }
    setLoading(false);
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, () => resetForm({ values: '' }));
        }}
        initialValues={{
          title: '',
          author: props.type === 'admin' ? '' : state.user.fullName,
          publication: '',
          categoryId: '',
          pages: '',
          isbn: '',
          about: '',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          setFieldTouched,
          setFieldValue,
          touched,
          errors,
          isValid,
        }) => (
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group>
              <Form.Control
                type="text"
                value={values.title}
                name="title"
                required
                placeholder="Title"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.title && !!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {touched.title && errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            {props.type === 'admin' && (
              <Form.Group>
                <Form.Control
                  type="text"
                  value={values.author}
                  name="author"
                  required
                  placeholder="Author"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.author && !!errors.author}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.author && errors.author}
                </Form.Control.Feedback>
              </Form.Group>
            )}
            <Form.Group>
              <Form.Control
                type="text"
                value={values.publication}
                name="publication"
                placeholder="Publication Date"
                onFocus={(e) => (e.target.type = 'month')}
                onChange={handleChange}
                onBlur={(e) => {
                  const date = e.target.value.split('-');
                  const pubDate = months[date[1] - 1] + ' ' + date[0];
                  setFieldValue(
                    'publication',
                    e.target.value ? pubDate : values.publication
                  );
                  setFieldTouched('publication', true);
                  e.target.type = 'text';
                }}
                isInvalid={touched.publication && !!errors.publication}
              />
              <Form.Control.Feedback type="invalid">
                {touched.publication && errors.publication}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="select"
                name="categoryId"
                value={values.categoryId}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.categoryId && !!errors.categoryId}
              >
                <option value={null}>Category</option>
                {!isLoading &&
                  data.data.data.map((category, i) => (
                    <option value={category.id}>{category.name}</option>
                  ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {touched.categoryId && errors.categoryId}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="number"
                value={values.pages}
                name="pages"
                placeholder="Pages"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.pages && !!errors.pages}
              />
              <Form.Control.Feedback type="invalid">
                {touched.pages && errors.pages}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="number"
                value={values.isbn}
                name="isbn"
                placeholder="ISBN"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.isbn && !!errors.isbn}
              />
              <Form.Control.Feedback type="invalid">
                {touched.isbn && errors.isbn}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              {/* <Form.Control
            as="textarea"
            value={values.about}
            name="about"
            rows={5}
            placeholder="About This Book"
            onChange={(e) => handleChange(e)}
          /> */}
              <Form.Control
                name="about"
                value={values.about}
                isInvalid={touched.about && !!errors.about}
                style={{ display: 'none' }}
              />
              <CKEditor
                editor={InlineEditor}
                className="form-control"
                config={{
                  placeholder: 'About This Book',
                  toolbar: [
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'link',
                    'bulletedList',
                    'numberedList',
                    'blockQuote',
                    'undo',
                    'redo',
                  ],
                }}
                data={values.about}
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
                  setFieldValue('about', data);
                }}
                onBlur={() => setFieldTouched('about', true)}
                isInvalid={touched.about && !!errors.about}
              />
              <Form.Control.Feedback type="invalid">
                {touched.about && errors.about}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <div
                className="form-control"
                onClick={() => document.getElementsByName('cover')[0].click()}
                style={{ width: 'max-content', cursor: 'pointer' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {fileName ? fileName : 'Attach Book Cover'}
                  <CgAttachment size="20px" className="ml-1" />
                </div>
              </div>
              <Form.File
                name="cover"
                accept="image/*"
                onChange={(e) => {
                  handleCoverChange(e);
                  setFileName(
                    !e.target.files[0] ? fileName : e.target.files[0].name
                  );
                }}
                style={{ display: 'none' }}
              />
            </Form.Group>

            <Form.Group>
              <div
                className="form-control"
                onClick={() => document.getElementsByName('file')[0].click()}
                style={{ width: 'max-content', cursor: 'pointer' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {file ? file.name : 'Attach Book File'}
                  <CgAttachment size="20px" className="ml-1" />
                </div>
              </div>
              <Form.File
                name="file"
                accept=".epub"
                onChange={(e) => {
                  setFileData({
                    ...fileData,
                    file: !e.target.files[0] ? file : e.target.files[0],
                  });
                }}
                style={{ display: 'none' }}
              />
            </Form.Group>

            {/* <Form.Group>
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
        </Form.Group> */}

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

            <Button
              variant="light"
              type="submit"
              className="primary float-right"
            >
              {loading ? (
                <ActionLoader />
              ) : (
                <>
                  Add Book <BiBookAdd size="20px" />
                </>
              )}
            </Button>
          </Form>
        )}
      </Formik>
      <AlertModal
        show={showSuccessAlert}
        onHide={() => setShowSuccessAlert(false)}
        label={
          props.type === 'admin'
            ? 'Book added successfully'
            : 'Thank you for adding your own book to our website, please wait 1 x 24 hours to verify whether this book is your writing'
        }
      />
    </>
  );
};

export default FormAddBook;
