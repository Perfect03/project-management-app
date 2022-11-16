import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SignupLogin = () => {
  const { t } = useTranslation();
  return (
    <>
      <NavLink to="/login" className="header-content__autorization">
        {t('To log in')}
      </NavLink>
      <NavLink to="/signup" className="header-content__autorization">
        {t('To sign up')}
      </NavLink>
    </>
  );
};

export { SignupLogin };
