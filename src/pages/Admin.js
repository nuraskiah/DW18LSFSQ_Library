import React from 'react';
import { Table, Button } from 'react-bootstrap';
import booksQueue from '../datas/booksQueue.json';
import { FaCheckCircle } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

function Admin() {
  return (
    <div className="admin mb-3">
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
                status={b.status}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

function UserBooksList(props) {
  let action, statusClass;
  switch (props.status) {
    case 'Approved':
      action = <FaCheckCircle color="green" size="20px" />;
      statusClass = 'align-middle text-success';
      break;
    case 'Cancel':
      action = <MdCancel color="red" size="23px" />;
      statusClass = 'align-middle text-danger';
      break;
    default:
      action = (
        <>
          <Button variant="danger" className="mr-2">
            Cancel
          </Button>
          <Button variant="success">Approve</Button>
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
        <td className="align-middle">*.epub</td>
        <td className={statusClass}>{props.status}</td>
        <td className="align-middle">{action}</td>
      </tr>
    </>
  );
}

export default Admin;
