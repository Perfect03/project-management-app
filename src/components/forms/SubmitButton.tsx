import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SubmitButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button
      onClick={() => {
        navigate(`/`);
      }}
      className="user-form__button"
      data-testid="buttonForm"
      type="submit"
    >
      {t('SUBMIT')}
    </button>
  );
};

export { SubmitButton };
