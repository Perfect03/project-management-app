import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Boards = () => {
  const { t } = useTranslation();
  return (
    <>
      <NavLink to="/boards" className="header-content__autorization">
      {t('BOARDS')}
      </NavLink>
    </>
  );
};

export { Boards };
