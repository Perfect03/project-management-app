import { isAuthReducer } from 'helpers/redux/userDataSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

const AfterLogin = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(isAuthReducer(false));
  };

  return (
    <>
      <NavLink to="/profile" className="header-content__autorization">
        Profile
      </NavLink>
      <NavLink to="/" className="header-content__autorization" onClick={handleLogOut}>
        Log out
      </NavLink>
    </>
  );
};

export { AfterLogin };
