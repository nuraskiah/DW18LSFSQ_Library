import React from 'react';
import { HashLoader, BeatLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'none',
};

export const PageLoader = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '0',
        height: '100vh',
        width: '100%',
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

export const ActionLoader = () => {
  return (
    <BeatLoader css={override} size={5} color={'#ffffff'} loading={true} />
  );
};
