import React, { useContext } from 'react';
import Book from '../components/Book';
import Loading from '../components/Loading';
import { API } from '../config/config';
import { useQuery } from 'react-query';
import { Context } from '../context/Context';

function MyLibrary() {
  const [state] = useContext(Context);
  const { id } = state.user;

  const { isLoading, data } = useQuery('getUserBookmarks', () =>
    API.get(`/bookmarks/${id}`)
  );

  return isLoading ? (
    <Loading />
  ) : (
    <div className="my-library">
      <h2 className="heading">My Library</h2>
      <div className="book-list">
        {data.data.data.map((bookmark, i) => {
          const { book } = bookmark;
          return (
            <Book
              id={book.id}
              cover={book.cover}
              title={book.title}
              author={book.author}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MyLibrary;
