import React from 'react';
import books from '../datas/books.json';
import Book from '../components/Book';

function MyLibrary() {
  return (
    <div className="my-library">
      <h2 className="bold mb-3">My Library</h2>
      <div className="book-list">
        {books.map((book, i) => {
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
