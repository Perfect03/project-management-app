import { NavLink, Outlet } from 'react-router-dom';
import React from 'react';
import './header.scss';

const Header = () => {
  window.addEventListener('scroll', Header_change);
  function Header_change() {
    const header_height = (document.querySelector('header') as HTMLElement).offsetHeight;
    if (window.scrollY > header_height) {
      document.querySelector('header')?.classList.add('Header_change');
    } else {
      document.querySelector('header')?.classList.remove('Header_change');
    }
  }

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
