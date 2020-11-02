import React from 'react';
import { Button } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { useMutation } from 'react-query';
import { API } from '../config/config';

const UserBooksList = (props) => {
  const [approve] = useMutation(async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      status: 'Approved',
    });

    await API.patch(`/book/${props.BookId}`, body, config);
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

    await API.patch(`/book/${props.BookId}`, body, config);
    props.refetchBooks();
  });

  const [deleteBook] = useMutation(async () => {
    await API.delete(`/book/${props.BookId}`);
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
            onClick={() => reject()}
          >
            Reject
          </Button>
          <Button
            variant="success"
            className="approve"
            onClick={() => approve()}
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
        <td className="align-middle">{props.title}</td>
        <td className="align-middle">{props.isbn}</td>
        <td className="align-middle">{props.ebook}</td>
        <td className={statusClass}>{props.status}</td>
        <td className="align-middle">{action}</td>
      </tr>
    </>
  );
};

export default UserBooksList;
