import React from 'react';
import './registration.scss';

function Registration() {
  return (
    <section className="registration-form" data-testid="formsBox">
      <form className="registration-form__content" data-testid="forms">
        <h1>Sign up</h1>
        <label className="registration-form__label" htmlFor="name">
          <input
            className="registration-form__input"
            data-testid="inputname"
            type="text"
            placeholder="Name"
          />
        </label>
        <label className="registration-form__label" htmlFor="login">
          <input
            className="registration-form__input"
            data-testid="inputlogin"
            type="text"
            placeholder="Login"
          />
        </label>
        <label className="registration-form__label" htmlFor="password">
          <input
            className="registration-form__input"
            data-testid="inputpass"
            type="password"
            placeholder="Password"
          />
        </label>
        <button className="registration-form__button" data-testid="buttonForm" type="submit">
          SIGN UP
        </button>
      </form>
    </section>
  );
}

export default Registration;
