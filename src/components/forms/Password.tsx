import React, { FC } from 'react';

const Password: FC<{ value: string; onChange: React.ChangeEventHandler<HTMLInputElement> }> = ({
  value,
  onChange,
}) => {
  return (
    <label className="user-form__label" htmlFor="password">
      <input
        id="password"
        className="user-form__input"
        onChange={onChange}
        value={value}
        placeholder="Password"
        type="password"
      />
    </label>
  );
};

export { Password };
