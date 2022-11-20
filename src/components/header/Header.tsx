import { NavLink, Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import './header.scss';
import { Language } from './header-components/Language';
import { SignupLogin } from './header-components/SignupLogin';
import { AfterLogin } from './header-components/AfterLogin';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { IGetState } from 'interfaces/redux';
import { checkCookie } from 'api/cokie';
import { isAuthReducer, userReducer } from 'helpers/redux/userDataSlice';
import { useDispatch } from 'react-redux';
import UserApi from 'api/user';

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

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(2);
    const userLogin = checkCookie('login', 'token');
    console.log(userLogin);
    if (userLogin) {
      setLogin(userLogin);
    } else {
      console.log('there is no cookie');
    }
  }, []);

  const setLogin = async (userLogin: string) => {
    try {
      const user = await UserApi.getUserInfo(userLogin);
      dispatch(userReducer(user));
      dispatch(isAuthReducer(true));
    } catch (error) {
      console.log('Connection error');
    }
  };

  const isAuth = useSelector((state: IGetState) => state.userData.isAuth);
  console.log(isAuth);
  return (
    <>
      <ToastContainer />
      <header className="header">
        <div className="header-gohome">
          <NavLink to="/">Your planner</NavLink>
        </div>
        <div className="header-content">
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
