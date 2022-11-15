import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Login: FC<{ value: string; onChange: React.ChangeEventHandler<HTMLInputElement> }> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <label className="user-form__label" htmlFor="login">
      <input
        id="login"
        className="user-form__input"
        onChange={onChange}
        value={value}
        placeholder={t('Login') as string}
        type="text"
      />
    </label>
  );
};

export { Login };
