import React from 'react';
import { useHistory } from 'react-router-dom';

function Book({ id, cover, title, author }) {
  const history = useHistory();
  return (
    <div className="book" onClick={() => history.push(`/detail/${id}`)}>
      <img src={cover} alt={title} className="mb-3" />
      <p
        className="title tnr mb-2"
        style={{
          fontWeight: '700',
          fontSize: 24,
          lineHeight: '29px',
        }}
      >
        {title}
      </p>
      <p className="author grey">{author}</p>
    </div>
  );
}

export default Book;
