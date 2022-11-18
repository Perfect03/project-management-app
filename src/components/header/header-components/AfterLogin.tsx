import { isAuthReducer } from 'helpers/redux/userDataSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const AfterLogin = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogOut = () => {
    dispatch(isAuthReducer(false));
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
