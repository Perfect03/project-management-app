import React from 'react';
import { NavLink } from 'react-router-dom';

const SignupLogin = () => {
  return (
    <>
      <NavLink to="/login" className="header-content__autorization">
        Log in
      </NavLink>
      <NavLink to="/signup" className="header-content__autorization">
        Sign up
      </NavLink>
    </>
  );
};

export { SignupLogin };
