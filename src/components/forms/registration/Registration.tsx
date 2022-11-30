import React from 'react';
import '../formStyles.scss';
import AuthorizationApi from '../../../api/authorization';
import { Name } from 'components/forms/Name';
import { Login } from 'components/forms/Login';
import { Password } from 'components/forms/Password';
import { FormValidate } from 'components/forms/Validate';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import UserApi from 'api/user';
import { isAuthReducer, isLoadingReducer, userReducer } from 'helpers/redux/userDataSlice';
import { toast } from 'react-toastify';
import store from 'helpers/redux/store';
import { setCookie } from 'api/cokie';
import { IGetUser } from '../../../interfaces/api';
import { IToastStatus } from '../../../interfaces/toast';
import { AxiosError } from 'axios';

function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const toastPromise = (status: IToastStatus) => {
    toast[`${status}`](
      status === 'success' ? t("You're successfully registered!") : t('User is already existed')
    );
  };

  const state = store.getState();
  const user = state.userData.user;

  const formik = useFormik({
    initialValues: {
      name: user.name,
      login: user.login,
      password: '',
    },

    onSubmit: (values) => {
      dispatch(isLoadingReducer(true));
      AuthorizationApi.SignUp(values)
        .then(async () => {
          AuthorizationApi.SignIn({ login: values.login, password: values.password }).then(
            async () => {
              setCookie('login', values.login, 365);
              const user = await UserApi.getUserInfo(values.login);
              dispatch(userReducer(user));
              dispatch(isAuthReducer(true));
              navigate('/');
              toastPromise('success');
            }
          );
        })
        .catch((err) => {
          if ((err as AxiosError).response?.status === 409) toastPromise('error');
        });
      dispatch(isLoadingReducer(false));
    },
    validate: (values) => {
      return FormValidate(values);
    },
  });

  return (
    <section className="user-form" data-testid="formsBox">
      <form onSubmit={formik.handleSubmit} className="user-form__content" data-testid="forms">
        <h1>{t('Sign up')}</h1>
        <div className="user-form-content-part">
          <Name onChange={formik.handleChange} value={formik.values.name} />
          {formik.errors.name ? (
            <span className="user-form__error">{t(formik.errors.name)}</span>
          ) : null}
        </div>
        <div className="user-form-content-part">
          <Login onChange={formik.handleChange} value={formik.values.login} />
          {formik.errors.login ? (
            <span className="user-form__error">{t(formik.errors.login)}</span>
          ) : null}
        </div>
        <div className="user-form-content-part">
          <Password onChange={formik.handleChange} value={formik.values.password} />
          {formik.errors.password ? (
            <span className="user-form__error">{t(formik.errors.password)}</span>
          ) : null}
        </div>
        <button className="user-form__button" type="submit">
          {t('To sign up')}
        </button>
      </form>
    </section>
  );
}

export default Registration;
