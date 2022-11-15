import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Password: FC<{ value: string; onChange: React.ChangeEventHandler<HTMLInputElement> }> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <label className="user-form__label" htmlFor="password">
      <input
        id="password"
        className="user-form__input"
        onChange={onChange}
        value={value}
        placeholder={t('Password')}
        type="password"
      />
    </label>
  );
};

export { Password };
