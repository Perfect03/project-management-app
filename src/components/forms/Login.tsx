import React, { FC } from 'react';

const Login: FC<{ value: string; onChange: React.ChangeEventHandler<HTMLInputElement> }> = ({
  value,
  onChange,
}) => {
  return (
    <label className="user-form__label" htmlFor="login">
      <input
        id="login"
        className="user-form__input"
        onChange={onChange}
        value={value}
        placeholder="Login"
        type="text"
      />
    </label>
  );
};

export { Login };
