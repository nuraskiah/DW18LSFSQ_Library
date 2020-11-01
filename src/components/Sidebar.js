import React, { useContext } from 'react';
import Navigation from './Navigation';
import { Context } from '../context/Context';
import { BiBookAdd, BiExit } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa';
import { VscLibrary } from 'react-icons/vsc';

function Sidebar() {
  const [state, dispatch] = useContext(Context);
  const { photo, fullName } = state.user;
  return (
    <div className="sidebar-container">
      <img src={photo} className="ava" />
      <p className="name dd">{fullName}</p>
      <br />
      <hr />

      <div class="navigations">
        <Navigation
          activeOnlyWhenExact={true}
          to="/profile"
          icon={<FaRegUser />}
          label="Profile"
          name="profile"
        />
        <Navigation
          activeOnlyWhenExact={true}
          to="/my-library"
          icon={<VscLibrary />}
          label="My Library"
          name="my-library"
        />
        <Navigation
          activeOnlyWhenExact={true}
          to="/add-book"
          icon={<BiBookAdd />}
          label="Add Book"
          name="add-book"
        />
      </div>
      <hr />
      <Navigation
        activeOnlyWhenExact={true}
        to="/"
        icon={<BiExit />}
        label="Logout"
        name="logout"
        onClick={() =>
          dispatch({
            type: 'LOGOUT',
          })
        }
        type="logout"
      />
    </div>
  );
}

export default Sidebar;
