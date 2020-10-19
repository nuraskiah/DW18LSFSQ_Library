import React, { useState, useEffect } from 'react';
import { ReactReader } from 'react-reader';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { BiFullscreen, BiExitFullscreen, BiFontSize } from 'react-icons/bi';

import { API } from '../config/config';
import Loading from '../components/Loading';

const Read = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [rendition, setRendition] = useState({});

  const { id } = useParams();

  const { isLoading, error, data: book } = useQuery('getBook', async () => {
    const { data } = await API.get(`/book/${id}`);
    const book = data.data;
    return book;
  });

  const getRendition = (rendition) => {
    setRendition(rendition);
    rendition.themes.fontSize(largeText ? '140%' : '100%');
  };

  return isLoading ? (
    <Loading />
  ) : error ? (
    <h1>Book not found!</h1>
  ) : (
    <>
      <div
        className={
          fullScreen ? 'reader-container fullscreen' : 'reader-container'
        }
      >
        <div className="reader-action">
          <div
            className="reader-btn"
            onClick={() => {
              setLargeText(!largeText);
              rendition.themes.fontSize(largeText ? '140%' : '100%');
            }}
          >
            <BiFontSize color="rgb(204, 204, 204)" size="25px" />
          </div>
          <div
            className="reader-btn"
            onClick={() => setFullScreen(!fullScreen)}
          >
            {fullScreen ? (
              <BiExitFullscreen color="rgb(204, 204, 204)" size="25px" />
            ) : (
              <BiFullscreen color="rgb(204, 204, 204)" size="25px" />
            )}
          </div>
        </div>
        <div style={{ position: 'relative', height: '100%' }}>
          <ReactReader
            url={`http://localhost:5000/files/${book.file}`}
            title={book.title}
            getRendition={(rendition) => getRendition(rendition)}
            // styles={{ fontSize: '140%' }}
          />
        </div>
      </div>
    </>
  );
};

export default Read;
