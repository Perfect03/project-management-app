import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Name: FC<{ value: string; onChange: React.ChangeEventHandler<HTMLInputElement> }> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <label className="user-form__label" htmlFor="name">
      <input
        id="name"
        className="user-form__input"
        placeholder={t('Name') as string}
        onChange={onChange}
        value={value}
        type="text"
      />
    </label>
  );
};

export { Name };
