import React from 'react';
import '../formStyles.scss';
import { Form, Field } from 'react-final-form';
import { IUserAuth } from 'interfaces/api';
import AuthorizationApi from '../../../api/authorization';
import { Name } from 'components/forms/Name';
import { Login } from 'components/forms/Login';
import { Password } from 'components/forms/Password';
import { SubmitButton } from 'components/forms/SubmitButton';
import { FormValidate } from 'components/forms/Validate';

function Registration() {
  const onSubmit = (e: IUserAuth) => {
    AuthorizationApi.SignUp(e);
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={FormValidate}
      render={({ handleSubmit }) => (
        <section className="user-form" data-testid="formsBox">
          <form onSubmit={handleSubmit} className="user-form__content" data-testid="forms">
            <h1>Sign up</h1>
            <Field name="name" render={({ input, meta }) => <Name input={input} meta={meta} />} />
            <Field name="login" render={({ input, meta }) => <Login input={input} meta={meta} />} />
            <Field
              name="password"
              render={({ input, meta }) => <Password input={input} meta={meta} />}
            />
            <SubmitButton></SubmitButton>
          </form>
        </section>
      )}
    />
  );
}

export default Registration;
