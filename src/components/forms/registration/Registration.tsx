import React from 'react';
import '../formStyles.scss';
import AuthorizationApi from '../../../api/authorization';
import { Name } from 'components/forms/Name';
import { Login } from 'components/forms/Login';
import { Password } from 'components/forms/Password';
import { FormValidate } from 'components/forms/Validate';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      login: '',
      password: '',
    },

    onSubmit: (values) => {
      AuthorizationApi.SignUp(values);
      navigate('/');
    },
    validate: (values) => {
      return FormValidate(values);
    },
  });

  return (
    <section className="user-form" data-testid="formsBox">
      <form onSubmit={formik.handleSubmit} className="user-form__content" data-testid="forms">
        <h1>Sign up</h1>
        <div className="user-form-content-part">
          <Name onChange={formik.handleChange} value={formik.values.name} />
          {formik.errors.name ? (
            <span className="user-form__error">{formik.errors.name}</span>
          ) : null}
        </div>
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
          Sign up
        </button>
      </form>
    </section>
  );
}

export default Registration;
