import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ReactReader } from 'react-reader';
import { FaCheckCircle } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { useMutation } from 'react-query';

import { API, fileURL } from '../config/config';

import Prompt from './Modal/Prompt';

const UserBooksList = (props) => {
  const [show, setShow] = useState(false);
  const [showApprovePrompt, setShowApprovePrompt] = useState(false);
  const [showRejectPrompt, setShowRejectPrompt] = useState(false);

  const [approve] = useMutation(async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      status: 'Approved',
    });

    await API.patch(`/book/${props.bookId}`, body, config);
    props.refetchBooks();
  });

  const [reject] = useMutation(async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      status: 'Rejected',
    });

    await API.patch(`/book/${props.bookId}`, body, config);
    props.refetchBooks();
  });

  const [deleteBook] = useMutation(async () => {
    await API.delete(`/book/${props.bookId}`);
    props.refetchBooks();
  });

  let action, statusClass;
  switch (props.status) {
    case 'Approved':
      action = <FaCheckCircle color="#3BB54A" size="31px" />;
      statusClass = 'align-middle text-approved';
      break;
    case 'Rejected':
      // action = <MdCancel color="#ff0742" size="29px" />;
      action = (
        <>
          <Button
            variant="danger"
            className="cancel"
            onClick={() => deleteBook()}
          >
            Delete
          </Button>
          {/* <Button
              variant="success"
              className="approve"
              onClick={() => approve()}
            >
              Approve
            </Button> */}
        </>
      );
      statusClass = 'align-middle text-cancel';
      break;
    default:
      action = (
        <>
          <Button
            variant="danger"
            className="cancel mr-2"
            onClick={() => setShowRejectPrompt(true)}
          >
            Reject
          </Button>
          <Button
            variant="success"
            className="approve"
            onClick={() => setShowApprovePrompt(true)}
          >
            Approve
          </Button>
        </>
      );
      statusClass = 'align-middle text-warning';
  }

  return (
    <>
      <tr>
        <td className="align-middle">{props.no}</td>
        <td className="align-middle">{props.author}</td>
        <td className="align-middle">{props.isbn}</td>
        <td
          className="align-middle"
          onClick={() => setShow(true)}
          style={{ cursor: 'pointer' }}
        >
          {props.ebook}
        </td>
        <td className={statusClass}>{props.status}</td>
        <td className="align-middle">{action}</td>
      </tr>

      {show && (
        <Modal
          show={show}
          className="preview"
          centered
          size="lg"
          onHide={() => setShow(false)}
        >
          <Modal.Body>
            <div style={{ position: 'relative', height: '100%' }}>
              <ReactReader
                url={`${fileURL}/${props.ebook}`}
                title={props.title}
              />
            </div>
          </Modal.Body>
        </Modal>
      )}

      {showApprovePrompt && (
        <Prompt
          show={showApprovePrompt}
          action="Approve"
          label={
            <p className="bold dh m-0">
              Are you sure you want to approve this book?
            </p>
          }
          onHide={() => setShowApprovePrompt(false)}
          onAction={() => approve()}
        />
      )}

      {showRejectPrompt && (
        <Prompt
          show={showRejectPrompt}
          action="Reject"
          label={
            <p className="bold dh m-0">
              Are you sure you want to reject this book?
            </p>
          }
          onHide={() => setShowRejectPrompt(false)}
          onAction={() => reject()}
        />
      )}
    </>
  );
};

export default UserBooksList;
