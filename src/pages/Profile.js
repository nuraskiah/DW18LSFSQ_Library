import React from 'react';

// component

import MyProfile from '../components/MyProfile';
import MyBooks from '../components/MyBooks';

const Profile = () => {
  return (
    <>
      <MyProfile />
      <br />
      <br />
      <MyBooks />
    </>
  );
};

export default Profile;
