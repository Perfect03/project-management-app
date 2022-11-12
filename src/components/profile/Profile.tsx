import React from 'react';
import './profile.scss';
import '../forms/formStyles.scss';
import { Form, Field } from 'react-final-form';
import { IUserAuth } from 'interfaces/api';
import AuthorizationApi from '../../api/authorization';
import { Name } from 'components/forms/Name';
import { Login } from 'components/forms/Login';
import { Password } from 'components/forms/Password';
import { SubmitButton } from 'components/forms/SubmitButton';
import { FormValidate } from 'components/forms/Validate';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const onSubmit = (e: IUserAuth) => {
    AuthorizationApi.SignUp(e);
  };

  const navigate = useNavigate();

  const handleChange = () => {
    navigate(`/`);
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={FormValidate}
      render={({ handleSubmit }) => (
        <section className="user-form" data-testid="formsBox">
          <form onSubmit={handleSubmit} className="user-form__content" data-testid="forms">
            <h1>EDIT PROFILE</h1>
            <Field name="name" render={({ input, meta }) => <Name input={input} meta={meta} />} />
            <Field name="login" render={({ input, meta }) => <Login input={input} meta={meta} />} />
            <Field
              name="password"
              render={({ input, meta }) => <Password input={input} meta={meta} />}
            />
            <SubmitButton></SubmitButton>
            <button onClick={handleChange} className="user-form__content-delete">
              DELETE PROFILE
            </button>
          </form>
        </section>
      )}
    />
  );
};

export { Profile };
