import React from 'react';
import './autorization.scss';
import { Form, Field } from 'react-final-form';

export interface Errors {
  Name: string;
  Login: string;
  Password: string;
}

function Autorization() {
  const onSubmit = (e: Errors) => {
    console.log(e);
  };
  const validate = (e: Errors) => {
    const errors = {} as Errors;
    if (e.Login && !/[A-Z]/.test(e.Login[0])) {
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
        <section className="autorization-form" data-testid="formsBox">
          <form onSubmit={handleSubmit} className="autorization-form__content" data-testid="forms">
            <h1>Log in</h1>
            <Field
              name="Login"
              render={({ input, meta }) => (
                <label className="autorization-form__label" htmlFor="login">
                  <input className="autorization-form__input" placeholder="Login" {...input} />
                  {meta.touched && meta.error && (
                    <span className="autorization-form__error">{meta.error}</span>
                  )}
                </label>
              )}
            />
            <Field
              name="Password"
              render={({ input, meta }) => (
                <label className="autorization-form__label" htmlFor="password">
                  <input className="autorization-form__input" placeholder="Password" {...input} />
                  {meta.touched && meta.error && (
                    <span className="autorization-form__error">{meta.error}</span>
                  )}
                </label>
              )}
            />
            <button className="autorization-form__button" data-testid="buttonForm" type="submit">
              LOG IN
            </button>
          </form>
        </section>
      )}
    />
  );
}

export default Autorization;
