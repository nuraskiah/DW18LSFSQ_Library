import React, { useState, useContext, useCallback } from 'react';
import { Context } from '../context/Context';
import { API } from '../config/config';
import { useMutation } from 'react-query';
import { Modal, Form, Button, Col } from 'react-bootstrap';
import { CgAttachment } from 'react-icons/cg';

import ImageCropper from './Cropper/ImageCropper';

const ChangeProfilePhoto = (props) => {
  const [state, dispatch] = useContext(Context);
  const [formData, setFormData] = useState({
    photo: '',
  });

  const { photo } = formData;

  const [changePhoto] = useMutation(async () => {
    try {
      const formData = new FormData();
      formData.append('photo', blob);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await API.patch(
        `/user/${state.user.id}`,
        formData,
        config
      );
      dispatch({
        type: 'GET_USER',
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  });

  // -------------------- CROP IMAGE --------------------------

  const [blob, setBlob] = useState(null);
  const [base, setBase] = useState(null);

  const getBlob = (blob) => {
    // pass blob up from the ImageCropper component
    setBlob(blob);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      setBase(reader.result);
    };
  };

  const handleFileChange = (e) => {
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
            photo: reader.result,
          });
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmitImage = (e) => {
    e.preventDefault();
    changePhoto();
  };

  return (
    <Modal
      {...props}
      size="md"
      className="rounded"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        {/* <h4 className="mb-4 sign">Change Profile Photo</h4> */}

        <Form onSubmit={(e) => handleSubmitImage(e)}>
          {/* <input
            type="file"
            accept="image/*"
            name="photo"
            onChange={(e) => handleFileChange(e)}
          /> */}
          {photo && (
            <>
              <ImageCropper
                getBlob={getBlob}
                inputImg={photo}
                aspect={1}
                shape="round"
                size={{ width: 328, height: 328 }}
                resize={{ width: 200, height: 200 }}
              />
              <br />
            </>
          )}
          <Form.Row>
            <Col>
              <Form.Group className="custom-file-container m-0">
                <div
                  className="form-control"
                  onClick={() => document.getElementsByName('photo')[0].click()}
                  style={{ width: 'max-content', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    Choose Photo
                    <CgAttachment size="20px" className="ml-1" />
                  </div>
                </div>
                <Form.File
                  name="photo"
                  accept="image/*"
                  label={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      Choose Photo
                      <CgAttachment size="20px" className="ml-1" />
                    </div>
                  }
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e)}
                />
              </Form.Group>
            </Col>
            <Col>
              {photo && (
                <Button type="submit" className="primary" block>
                  Save
                </Button>
              )}
            </Col>
          </Form.Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangeProfilePhoto;
