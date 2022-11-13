import React from 'react';
import '../formStyles.scss';
import AuthorizationApi from '../../../api/authorization';
import { Login } from 'components/forms/Login';
import { Password } from 'components/forms/Password';
import { FormValidate } from 'components/forms/Validate';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { setCookie } from 'api/cokie';

function Autorization() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },

    onSubmit: (values) => {
      AuthorizationApi.SignIn(values);
      setCookie('login', values.login, 30);
      setCookie('password', values.password, 30);
      navigate('/');
    },
    validate: (values) => {
      return FormValidate(values);
    },
  });

  return (
    <section className="user-form" data-testid="formsBox">
      <form onSubmit={formik.handleSubmit} className="user-form__content" data-testid="forms">
        <h1>Log in</h1>
        <div className="user-form-content-part">
          <Login onChange={formik.handleChange} value={formik.values.login} />
          {formik.errors.login ? (
            <span className="user-form__error">{formik.errors.login}</span>
          ) : null}
        </div>
        <div className="user-form-content-part">
          <Password onChange={formik.handleChange} value={formik.values.password} />
          {formik.errors.password ? (
            <span className="user-form__error">{formik.errors.password}</span>
          ) : null}
        </div>
        <button className="user-form__button" type="submit">
          Log in
        </button>
      </form>
    </section>
  );
}

export default Autorization;
