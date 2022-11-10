import { NavLink, Outlet } from 'react-router-dom';
import React from 'react';
import './header.scss';

const Header = () => {
  return (
    <>
      <header>
        <div className="HomePage">
          <NavLink to="/" data-testid="navHome">
            Your planer
          </NavLink>
        </div>
        <div>
          <select data-testid="navAbout">
            <option>EN</option>
            <option>RU</option>
          </select>
          <NavLink to="/login" data-testid="navLogin">
            Log in
          </NavLink>
          <NavLink to="/signup" data-testid="navSign">
            Sign up
          </NavLink>
        </div>
      </header>
      <div className="wrapper">
        <Outlet />
      </div>
    </>
  );
};

export { Header };
