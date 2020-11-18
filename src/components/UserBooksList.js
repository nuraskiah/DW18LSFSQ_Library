import React, { useState } from 'react';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
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
  const [showResetPrompt, setShowResetPrompt] = useState(false);

  const { cover } = props;

  const [handleAction] = useMutation(async (type) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      status: type,
    });

    await API.patch(`/book/${props.bookId}`, body, config);
    props.refetchBooks();
  });

  const [deleteBook] = useMutation(async () => {
    await API.delete(`/book/${props.bookId}`);
    props.refetchBooks();
  });

  let action, statusClass;

  if (props.status === 'Pending') {
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
  } else {
    action = (
      <>
        <Button
          variant="secondary"
          className="reset"
          onClick={() => setShowResetPrompt(true)}
        >
          Reset
        </Button>
      </>
    );
    statusClass =
      props.status === 'Approved'
        ? 'align-middle text-approved'
        : 'align-middle text-cancel';
  }

  return (
    <>
      <tr>
        <td className="align-middle">{props.no}</td>
        <td className="align-middle">{props.author}</td>
        <td className="align-middle">{props.isbn}</td>

        <OverlayTrigger
          placement="top"
          overlay={(props) => (
            <Tooltip {...props}>
              <img
                src={cover}
                alt="cover"
                style={{ width: 100, height: 135 }}
              />
            </Tooltip>
          )}
        >
          <td
            className="align-middle"
            onClick={() => setShow(true)}
            style={{ cursor: 'pointer' }}
          >
            {props.ebook}
          </td>
        </OverlayTrigger>

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
          onAction={() => handleAction('Approved')}
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
          onAction={() => handleAction('Rejected')}
        />
      )}

      {showResetPrompt && (
        <Prompt
          show={showResetPrompt}
          action="Reset"
          label={<p className="bold dh m-0">Are you sure you want to undo?</p>}
          onHide={() => setShowResetPrompt(false)}
          onAction={() => handleAction('Pending')}
        />
      )}
    </>
  );
};

export default UserBooksList;
