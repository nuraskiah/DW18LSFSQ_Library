import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { API } from '../../config/config';

import Loading from '../../components/Loading';

const useQueryMultiple = () => {
  const res1 = useQuery('getBooks', () => API.get('/books'));
  const res2 = useQuery('getUsers', () => API.get('/users'));

  return [res1, res2];
};

const Dashboard = () => {
  const res = useQueryMultiple();
  const books = res[0];
  const users = res[1];
  return books.isLoading || users.isLoading ? (
    <Loading />
  ) : (
    <div className="admin dashboard">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body {
              background-color: #f9f9f9;
            }`,
        }}
      />

      <Row>
        <Col>
          <h3>Books</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Books</h4>
          <p>{books.data.data.data.length}</p>
        </Col>
        <Col className="text-approved">
          <h4>Approved</h4>
          <p>
            {
              books.data.data.data.filter((data) => data.status === 'Approved')
                .length
            }
          </p>
        </Col>
        <Col className="text-warning">
          <h4>Pending</h4>
          <p>
            {
              books.data.data.data.filter((data) => data.status === 'Pending')
                .length
            }
          </p>
        </Col>
        <Col className="text-cancel">
          <h4>Rejected</h4>
          <p>
            {
              books.data.data.data.filter((data) => data.status === 'Rejected')
                .length
            }
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Users</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Admin</h4>
          <p>
            {
              users.data.data.data.filter((user) => user.role === 'admin')
                .length
            }
          </p>
        </Col>
        <Col>
          <h4>User</h4>
          <p>
            {users.data.data.data.filter((user) => user.role === 'user').length}
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
