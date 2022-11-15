import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SignupLogin = () => {
  const { t } = useTranslation();
  return (
    <>
      <NavLink to="/login" className="header-content__autorization">
        {t('Log in')}
      </NavLink>
      <NavLink to="/signup" className="header-content__autorization">
        {t('Sign up')}
      </NavLink>
    </>
  );
};

export { SignupLogin };
