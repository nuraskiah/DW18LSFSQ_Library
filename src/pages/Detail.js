import React, { useState, useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { BsBookmarkPlus, BsBookmarkDash, BsChevronRight } from 'react-icons/bs';
import ReactHtmlParser from 'react-html-parser';
import { API } from '../config/config';
import { useMutation, useQuery } from 'react-query';
import { Context } from '../context/Context';

import AlertModal from '../components/AlertModal';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Detail = () => {
  const { id } = useParams();
  const history = useHistory();

  const [showAddAlert, setShowAddAlert] = useState(false);
  const [showRmvAlert, setShowRmvAddAlert] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [state, dispatch] = useContext(Context);
  const userId = state.user.id;

  const { isLoading, error, data: book } = useQuery('getBook', async () => {
    const { data } = await API.get(`/book/${id}`);
    const book = data.data;
    if (book.bookmarks.some((bookmark) => bookmark.userId === userId))
      setBookmarked(true);
    return book;
  });

  const [bookmark] = useMutation((id) => API.post(`/bookmark/${id}/${userId}`));

  const [unBookmark] = useMutation((id) =>
    API.delete(`/unbookmark/${id}/${userId}`)
  );

  const addBookmark = () => {
    setShowAddAlert(true);
    bookmark(id);
    setBookmarked(true);
  };

  const removeBookmark = () => {
    setShowRmvAddAlert(true);
    unBookmark(id);
    setBookmarked(false);
  };

  return isLoading ? (
    <Loading />
  ) : error ? (
    <Error />
  ) : (
    <div className="detail-container">
      <Row className="mb-5">
        <Col md={5}>
          <img
            src={book.cover}
            alt="cover"
            style={{
              width: '400px',
              height: '540px',
              borderRadius: '10px',
              objectFit: 'cover',
            }}
          />
        </Col>

        <Col md={7} className="pl-5">
          <h2
            className="tnr bold mb-0"
            style={{ fontSize: 64, lineHeight: '1em' }}
          >
            {book.title}
          </h2>
          <p className="mt-3">{book.author}</p>
          <br />

          <DetailItem name="Publication date" data={book.publication} />
          <DetailItem name="Category" data={book.category.name} />
          <DetailItem name="Pages" data={book.pages} />
          <DetailItem name="ISBN" data={book.isbn} style="text-danger" />
        </Col>
      </Row>
      <hr />
      <Row className="mt-5">
        <Col>
          <h3 className="heading">About This Book</h3>
          <p className="about text-justify mb-5">
            {ReactHtmlParser(book.about)}
          </p>

          <Button
            variant="light"
            className="float-right"
            onClick={() => history.push(`/read/${book.id}`)}
          >
            Read Book <BsChevronRight size="20px" />
          </Button>

          {bookmarked ? (
            <Button
              variant="light"
              className="primary mr-3 float-right"
              onClick={() => {
                removeBookmark();
              }}
            >
              Remove from Library <BsBookmarkDash size="20px" />
            </Button>
          ) : (
            <Button
              variant="light"
              className="primary mr-3 float-right"
              onClick={() => {
                addBookmark();
              }}
            >
              Add to Library <BsBookmarkPlus size="20px" />
            </Button>
          )}
        </Col>
      </Row>

      <AlertModal
        show={showAddAlert}
        onHide={() => setShowAddAlert(false)}
        label="Your book has been added successfully"
      />
      <AlertModal
        show={showRmvAlert}
        onHide={() => setShowRmvAddAlert(false)}
        label="Your book has been removed successfully"
      />
    </div>
  );
};

const DetailItem = ({ name, data, style }) => {
  const classs = `bold dh ${style}`;
  return (
    <div className="detail">
      <p className={classs}>{name}</p>
      <p className="dd">{data}</p>
    </div>
  );
};

export default Detail;
