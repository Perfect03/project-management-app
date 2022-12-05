import React from 'react';
import { useTranslation } from 'react-i18next';
import './profile.scss';
import '../forms/formStyles.scss';

const UpdateButton = () => {
  const { t } = useTranslation();
  return (
    <button className="user-form__button" type="submit">
      {t('UPDATE')}
    </button>
  );
};

export { UpdateButton };
