import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

function Navigation({ to, activeOnlyWhenExact, icon, label, onClick, type }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <Link to={to} className="none" id="none">
      <div
        className={match ? `navigation ${type} active` : `navigation ${type}`}
        onClick={onClick}
      >
        <span className="icon">{icon}</span>
        {label}
      </div>
    </Link>
  );
}

Navigation.defaultProps = {
  to: null,
  activeOnlyWhenExact: null,
  onClick: null,
  type: null,
};

export default Navigation;
