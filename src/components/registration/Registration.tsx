import React from 'react';
import './registration.scss';
import { Form, Field } from 'react-final-form';

export interface Errors {
  Name: string;
  Login: string;
  Password: string;
}

function Registration() {
  const onSubmit = (e: Errors) => {
    console.log(e);
  };

  const validate = (e: Errors) => {
    const errors = {} as Errors;
    if (e.Name && e.Name.length < 2) {
      errors.Name = 'Too short';
    } else if (e.Name && /[0-9]/.test(e.Name)) {
      errors.Name = 'Use only letters';
    } else if (e.Name && !/[A-Z]/.test(e.Name[0])) {
      errors.Name = 'The first letter must be uppercase';
    } else if (e.Login && !/[A-Z]/.test(e.Login[0])) {
      errors.Login = 'The first letter must be uppercase';
    } else if (e.Login && e.Login.length < 5) {
      errors.Login = 'Too short';
    } else if (e.Password && e.Password.length < 8) {
      errors.Password = 'Too short';
    } else if (
      (e.Password && !/[0-9]/.test(e.Password)) ||
      (e.Password && !/[a-z, A-Z]/.test(e.Password))
    ) {
      errors.Password = 'Use letters and digits';
    }
    return errors;
  };
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <section className="registration-form" data-testid="formsBox">
          <form onSubmit={handleSubmit} className="registration-form__content" data-testid="forms">
            <h1>Sign up</h1>
            <Field
              name="Name"
              render={({ input, meta }) => (
                <label className="registration-form__label" htmlFor="name">
                  <input className="registration-form__input" placeholder="Name" {...input} />
                  {meta.touched && meta.error && (
                    <span className="registration-form__error">{meta.error}</span>
                  )}
                </label>
              )}
            />
            <Field
              name="Login"
              render={({ input, meta }) => (
                <label className="registration-form__label" htmlFor="login">
                  <input className="registration-form__input" {...input} placeholder="Login" />
                  {meta.touched && meta.error && (
                    <span className="registration-form__error">{meta.error}</span>
                  )}
                </label>
              )}
            />
            <Field
              name="Password"
              render={({ input, meta }) => (
                <label className="registration-form__label" htmlFor="password">
                  <input className="registration-form__input" {...input} placeholder="Password" />
                  {meta.touched && meta.error && (
                    <span className="registration-form__error">{meta.error}</span>
                  )}
                </label>
              )}
            />
            <button className="registration-form__button" data-testid="buttonForm" type="submit">
              SIGN UP
            </button>
          </form>
        </section>
      )}
    />
  );
}

export default Registration;
