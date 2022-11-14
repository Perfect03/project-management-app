import React from 'react';
import { NavLink } from 'react-router-dom';

const AfterLogin = () => {
  return (
    <>
      <NavLink to="/profile" className="header-content__autorization">
        Profile
      </NavLink>
      <NavLink to="/" className="header-content__autorization">
        Log out
      </NavLink>
    </>
  );
};

export { AfterLogin };
