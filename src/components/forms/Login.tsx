import React, { FC } from 'react';
import { FieldMetaState } from 'react-final-form';
import { FieldInputProps } from 'react-final-form';

const Login: FC<{ input: FieldInputProps<any>; meta: FieldMetaState<any> }> = ({ input, meta }) => {
  return (
    <label className="user-form__label" htmlFor="login">
      <input className="user-form__input" {...input} placeholder="Login" />
      {meta.touched && meta.error && <span className="user-form__error">{meta.error}</span>}
    </label>
  );
};

export { Login };
