import React from 'react';
import { MdErrorOutline } from 'react-icons/md';

const Error = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MdErrorOutline size="100px" />
      <br />
      <h2>Book Not Found</h2>
    </div>
  );
};

export default Error;
