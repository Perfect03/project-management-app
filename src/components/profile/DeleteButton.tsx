import React from 'react';
import './profile.scss';
import '../forms/formStyles.scss';
import { isLoadingReducer, userReducer, isAuthReducer } from 'helpers/redux/userDataSlice';
import { useDispatch } from 'react-redux';
import UserApi from '../../api/user';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { deleteCookie } from 'api/cokie';

const DeleteButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toastDeletePromise = () => {
    toast.warn(t('Profile has removed'));
  };

  const handleClick = async () => {
    dispatch(isLoadingReducer(true));
    await UserApi.deleteUserById();
    const emptyUser = { _id: '', name: '', login: '' };
    dispatch(userReducer(emptyUser));
    dispatch(isAuthReducer(false));
    deleteCookie('login', 'token');
    dispatch(isLoadingReducer(false));
    navigate('/');
    toastDeletePromise();
  };

  return (
    <button className="user-form__content-delete" onClick={handleClick}>
      {t('DELETE PROFILE')}
    </button>
  );
};

export { DeleteButton };
