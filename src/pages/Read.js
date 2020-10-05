import React from 'react';
import { ReactReader } from 'react-reader';
import epub from '../assets/the_little_prince.epub';

export const buttonStyle = {
  position: 'fixed',
  bottom: '1.5rem',
  right: '1.5rem',
  zIndex: '10',
  background: '#eee',
  borderRadius: '2px',
  padding: '0.5rem',
};

const Read = () => {
  return (
    <div style={{ paddingTop: 120, height: '100vh' }}>
      <div style={{ position: 'relative', height: '100%' }}>
        <ReactReader
          url={epub}
          title={'The Little Prince'}
          location={'epubcfi(/6/2[cover]!/6)'}
          locationChanged={(epubcifi) => console.log(epubcifi)}
        />
      </div>
    </div>
  );
};

export default Read;
