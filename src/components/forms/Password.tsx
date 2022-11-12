import React, { FC } from 'react';
import { FieldMetaState } from 'react-final-form';
import { FieldInputProps } from 'react-final-form';

const Password: FC<{ input: FieldInputProps<any>; meta: FieldMetaState<any> }> = ({
  input,
  meta,
}) => {
  return (
    <label className="user-form__label" htmlFor="password">
      <input className="user-form__input" {...input} placeholder="Password" />
      {meta.touched && meta.error && <span className="user-form__error">{meta.error}</span>}
    </label>
  );
};

export { Password };
