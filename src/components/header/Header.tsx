import { NavLink, Outlet } from 'react-router-dom';
import React from 'react';
import './header.scss';
import { Language } from './Language';
import { SignupLogin } from './SignupLogin';
import { AfterLogin } from './AfterLogin';

const Header = () => {
  window.addEventListener('scroll', Header_change);
  function Header_change() {
    const header_height = (document.querySelector('header') as HTMLElement).offsetHeight;
    if (window.scrollY > header_height) {
      document.querySelector('header')?.classList.add('header_change');
    } else {
      document.querySelector('header')?.classList.remove('header_change');
    }
  }

  return (
    <>
      <header className="header">
        <div className="header-gohome">
          <NavLink to="/">Your planer</NavLink>
        </div>
        <div className="header-content">
          <Language />
          <SignupLogin />
          <AfterLogin />
        </div>
      </header>
      <div className="wrapper">
        <Outlet />
      </div>
    </>
  );
};

export { Header };
