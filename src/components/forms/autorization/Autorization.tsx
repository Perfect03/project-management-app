import React from 'react';
import '../formStyles.scss';
import AuthorizationApi from '../../../api/authorization';
import { Login } from 'components/forms/Login';
import { Password } from 'components/forms/Password';
import { FormValidate } from 'components/forms/Validate';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import UserApi from 'api/user';
import { setCookie } from 'api/cokie';
import BoardsApi from 'api/board';
import { isAuthReducer, isLoadingReducer, userReducer } from 'helpers/redux/userDataSlice';
import { IToastStatus } from '../../../interfaces/toast';
import { boardsReducer } from 'helpers/redux/boardsDataSlice';
import { AxiosError } from 'axios';

function Autorization() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const toastPromise = (status: IToastStatus) => {
    if(status === 'success') toast['success'](t("You're authorized"));
    if(status === 'off') toast['error'](t("Connection error"));
    if(status === 'error') toast['error'](t("Incorrect login or password"));
  };

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },

    onSubmit: async (values) => {
      dispatch(isLoadingReducer(true));
      AuthorizationApi.SignIn(values)
        .then(async () => {
          setCookie('login', values.login, 365);
          const user = await UserApi.getUserInfo(values.login);
          dispatch(userReducer(user));
          dispatch(isAuthReducer(true));
          navigate('/');
          toastPromise('success');

          const boards = await BoardsApi.getAllBoards();
          dispatch(boardsReducer(boards));
          dispatch(isLoadingReducer(false));
        })
        .catch((error) => {
          if ((error as AxiosError).response?.status === 401) toastPromise('error')
          else toastPromise('off')
          dispatch(isLoadingReducer(false));
        });
    },
    validate: (values) => {
      return FormValidate(values);
    },
  });

  return (
    <section className="user-form" data-testid="formsBox">
      <form onSubmit={formik.handleSubmit} className="user-form__content" data-testid="forms">
        <h1>{t('Log in')}</h1>
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
          {t('To log in')}
        </button>
      </form>
    </section>
  );
}

export default Autorization;
