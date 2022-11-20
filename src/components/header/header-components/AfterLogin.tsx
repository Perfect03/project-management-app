import { isAuthReducer, userReducer } from 'helpers/redux/userDataSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { deleteCookie } from 'api/cokie';

const AfterLogin = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const toastLogOutPromise = () => {
    toast.info(t("You're logged out"));
  };

  const handleLogOut = () => {
    dispatch(isAuthReducer(false));
    const emptyUser = { _id: '', name: '', login: '' };
    dispatch(userReducer(emptyUser));
    deleteCookie('login', 'token');
    toastLogOutPromise();
  };

  return (
    <>
      <NavLink to="/profile" className="header-content__autorization">
        {t('Profile')}
      </NavLink>
      <NavLink to="/" className="header-content__autorization" onClick={handleLogOut}>
        {t('Log out')}
      </NavLink>
    </>
  );
};

export { AfterLogin };
