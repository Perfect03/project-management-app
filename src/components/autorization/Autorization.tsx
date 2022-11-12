import React, { FC } from 'react';
import './autorization.scss';

export const Autorization: FC = () => {
  return (
    <section className="autorization-form" data-testid="formsBox">
      <form className="autorization-form__content" data-testid="forms">
        <h1>Log in</h1>
        <label className="autorization-form__label" htmlFor="login">
          <input
            className="autorization-form__input"
            data-testid="inputlogin"
            type="text"
            placeholder="Login"
          />
        </label>
        <label className="autorization-form__label" htmlFor="password">
          <input
            className="autorization-form__input"
            data-testid="inputpass"
            type="password"
            placeholder="Password"
          />
        </label>
        <button className="autorization-form__button" data-testid="buttonForm" type="submit">
          LOG IN
        </button>
      </form>
    </section>
  );
};
