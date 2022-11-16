import React from 'react';
import './profile.scss';
import '../forms/formStyles.scss';
import UserApi from '../../api/user';
import { Name } from 'components/forms/Name';
import { Login } from 'components/forms/Login';
import { Password } from 'components/forms/Password';
import { FormValidate } from 'components/forms/Validate';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { UpdateButton } from './UpdateButton';
import { DeleteButton } from './DeleteButton';
import store from 'helpers/redux/store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isLoadingReducer, userReducer } from 'helpers/redux/userDataSlice';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const state = store.getState();
  const user = state.userData.user;

  const formik = useFormik({
    initialValues: {
      name: user.name,
      login: user.login,
      password: '',
    },

    onSubmit: async (values) => {
      dispatch(isLoadingReducer(true));
      const newUserInfo = await UserApi.updateUserById(values);
      dispatch(userReducer(newUserInfo));
      dispatch(isLoadingReducer(false));
      navigate('/');
    },
    validate: (values) => {
      return FormValidate(values);
    },
  });

  return (
    <section className="user-form" data-testid="formsBox">
      <form onSubmit={formik.handleSubmit} className="user-form__content" data-testid="forms">
        <h1>{t('EDIT PROFILE')}</h1>
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
        <UpdateButton />
        <DeleteButton />
      </form>
    </section>
  );
};

export { Profile };
