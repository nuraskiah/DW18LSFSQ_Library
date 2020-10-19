import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/images/student 1.svg';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Context } from '../context/Context';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { BiBookAdd, BiExit } from 'react-icons/bi';
import { TiThList } from 'react-icons/ti';

function NavBar() {
  const [state, dispatch] = useContext(Context);
  let { path, url } = useRouteMatch();
  const history = useHistory();

  let match = useRouteMatch({
    path: '/admin',
    exact: false,
  });

  return (
    <nav>
      <Link to="/home" style={{ textDecoration: 'none' }}>
        <div className="nav-item">
          <img
            src={icon}
            alt="icon"
            style={{ width: '50px', height: '50px' }}
          />
          <p className="tnr italic bold m-0" style={{ fontSize: 36 }}>
            Lib’rary
          </p>
        </div>
      </Link>
      {match !== null && state.isAdmin && (
        <>
          <OverlayTrigger
            trigger="click"
            key="bottom"
            placement="bottom"
            className="nav-item"
            overlay={
              <Popover>
                <Popover.Content>
                  <div
                    className="pop-item"
                    onClick={() => history.push('/admin')}
                  >
                    <TiThList size="20px" clasName="icon" />
                    <p className="ml-2">Verify Book</p>
                  </div>
                  <div
                    className="pop-item"
                    onClick={() => history.push('/admin/add-book')}
                  >
                    <BiBookAdd size="20px" clasName="icon" />
                    <p className="ml-2">Add Book</p>
                  </div>
                  <div
                    className="pop-item"
                    onClick={() =>
                      dispatch({
                        type: 'LOGOUT',
                      })
                    }
                  >
                    <BiExit size="20px" clasName="icon" color="red" />
                    <p className="ml-2">Logout</p>
                  </div>
                </Popover.Content>
              </Popover>
            }
          >
            <img
              src={`http://localhost:5000/photos/${state.user.photo}`}
              style={{
                width: 50,
                height: 50,
                position: 'absolute',
                right: '35px',
                borderRadius: 50,
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.3)',
                objectFit: 'cover',
                cursor: 'pointer',
              }}
              className="nav-item"
            ></img>
          </OverlayTrigger>
        </>
      )}
    </nav>
  );
}

export default NavBar;
