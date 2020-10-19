import React from 'react';
import { HashLoader } from 'react-spinners';

const Loading = () => {
  const override = {
    display: 'block',
    margin: '0 auto',
    bordeColor: 'red',
  };
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <HashLoader
        style={override}
        size={100}
        color={'#ee4622'}
        loading={true}
      />
    </div>
  );
};

export default Loading;
