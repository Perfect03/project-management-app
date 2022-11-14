import React from 'react';
import { NavLink } from 'react-router-dom';

const Boards = () => {
  return (
    <>
      <NavLink to="/boards" className="header-content__autorization">
        BOARDS
      </NavLink>
    </>
  );
};

export { Boards };
