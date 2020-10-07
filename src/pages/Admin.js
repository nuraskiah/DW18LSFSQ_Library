import React from 'react';
import { Table, Button } from 'react-bootstrap';
import booksQueue from '../datas/booksQueue.json';
import { FaCheckCircle } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

function Admin() {
  return (
    <div className="admin">
      <div class="admin-wrapper">
        <h2 className="bold">Book Verification</h2>
        <Table hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Users or Author</th>
              <th>ISBN</th>
              <th>E-book</th>
              <th>Status</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {booksQueue.map((b, i) => {
              return (
                <UserBooksList
                  no={i + 1}
                  title={b.title}
                  isbn={b.isbn}
                  ebook={b.ebook}
                  status={b.status}
                />
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

function UserBooksList(props) {
  let action, statusClass;
  switch (props.status) {
    case 'Approved':
      action = <FaCheckCircle color="#3BB54A" size="25px" />;
      statusClass = 'align-middle text-approved';
      break;
    case 'Cancel':
      // action = <MdCancel color="#ff0742" size="29px" />;
      action = <AdminButton />;
      statusClass = 'align-middle text-cancel';
      break;
    default:
      action = <AdminButton />;

      statusClass = 'align-middle text-warning';
  }

  return (
    <>
      <tr>
        <td className="align-middle">{props.no}</td>
        <td className="align-middle">{props.title}</td>
        <td className="align-middle">{props.isbn}</td>
        <td className="align-middle">{props.ebook}</td>
        <td className={statusClass}>
          {props.status === 'Waiting' ? 'Waiting to be verified' : props.status}
        </td>
        <td className="align-middle">{action}</td>
      </tr>
    </>
  );
}

const AdminButton = () => {
  return (
    <>
      <Button variant="danger" className="cancel mr-2">
        Cancel
      </Button>
      <Button variant="success" className="approve">
        Approve
      </Button>
    </>
  );
};

export default Admin;
