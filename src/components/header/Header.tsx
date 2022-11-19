import { NavLink, Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import './header.scss';
import { Language } from './header-components/Language';
import { SignupLogin } from './header-components/SignupLogin';
import { AfterLogin } from './header-components/AfterLogin';
import { Boards } from './header-components/Boards';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { IGetState } from 'interfaces/redux';

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

  const isAuth = useSelector((state: IGetState) => state.userData.isAuth);

  return (
    <>
      <ToastContainer />
      <header className="header">
        <div className="header-gohome">
          <NavLink to="/">Your planer</NavLink>
        </div>
        <div className="header-content">
          <Boards />
          <Language />
          {isAuth ? <AfterLogin /> : <SignupLogin />}
        </div>
      </header>
      <div className="wrapper">
        <Outlet />
      </div>
    </>
  );
};

export { Header };
