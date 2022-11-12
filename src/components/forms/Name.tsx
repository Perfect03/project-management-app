import React, { FC } from 'react';
import { FieldMetaState } from 'react-final-form';
import { FieldInputProps } from 'react-final-form';

const Name: FC<{ input: FieldInputProps<any>; meta: FieldMetaState<any> }> = ({ input, meta }) => {
  return (
    <label className="user-form__label" htmlFor="name">
      <input className="user-form__input" placeholder="Name" {...input} />
      {meta.touched && meta.error && <span className="user-form__error">{meta.error}</span>}
    </label>
  );
};

export { Name };
