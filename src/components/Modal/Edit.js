import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useQuery, useMutation } from 'react-query';
import { Formik } from 'formik';
import * as yup from 'yup';

import { API } from '../../config/config';

import { ActionLoader } from '../Loader';

const Edit = (props) => {
  const [loading, setLoading] = useState(false);

  const schema = yup.object({
    title: yup.string().required(),
    publication: yup.string().required(),
    categoryId: yup.number().required(),
    pages: yup.number().required(),
    isbn: yup.number().required(),
  });

  const handleSubmit = async (values) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { title, publication, categoryId, pages, isbn } = values;

    const body = JSON.stringify({
      title,
      publication,
      categoryId,
      pages,
      isbn,
    });

    try {
      setLoading(true);
      const { data } = await API.patch(`/book/${props.book.id}`, body, config);
      await props.refetch();
      props.onHide();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const { isLoading, error, data } = useQuery('getCategories', () =>
    API.get('/categories')
  );

  return (
    <Modal show={props.show} centered backdrop="static" size="lg">
      <Modal.Body className="p-4">
        <h4 className="mb-4 sign">Edit Book</h4>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          initialValues={{
            title: props.book.title,
            publication: props.book.publication,
            categoryId: props.book.category.id,
            pages: props.book.pages,
            isbn: props.book.isbn,
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.title && !!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.title && errors.title}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Publication Date"
                  name="publication"
                  value={values.publication}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  required
                >
                  <option value={null}>Category</option>
                  {!isLoading &&
                    data.data.data.map((category, i) => (
                      <option
                        value={category.id}
                        selected={
                          category.id === props.book.category.id ? true : false
                        }
                      >
                        {category.name}
                      </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {touched.categoryId && errors.categoryId}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="number"
                  placeholder="Pages"
                  name="pages"
                  value={values.pages}
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
                  placeholder="ISBN"
                  name="isbn"
                  value={values.isbn}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.isbn && !!errors.isbn}
                  disabled
                />
                <Form.Control.Feedback type="invalid">
                  {touched.isbn && errors.isbn}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="action-button">
                <Button variant="light" onClick={props.onHide}>
                  Cancel
                </Button>
                <Button className="primary" type="submit">
                  {loading ? <ActionLoader /> : 'Save'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Edit;
