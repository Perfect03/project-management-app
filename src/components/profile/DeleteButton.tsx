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
import { IToastStatus } from 'interfaces/toast';

const DeleteButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toastDeletePromise = (status: IToastStatus) => {
    if(status === 'success') toast.warn(t("Profile has removed"));
    if(status === 'off') toast['error'](t("Connection error"));
  };

  const handleClick = async () => {
    try{
    dispatch(isLoadingReducer(true));
    await UserApi.deleteUserById();
    const emptyUser = { _id: '', name: '', login: '' };
    dispatch(userReducer(emptyUser));
    dispatch(isAuthReducer(false));
    deleteCookie('login', 'token');
    navigate('/');
    toastDeletePromise('success');
  }
  catch (err) {
    toastDeletePromise('off');
  }
  dispatch(isLoadingReducer(false));
  };

  return (
    <button className="user-form__content-delete" onClick={handleClick}>
      {t('DELETE PROFILE')}
    </button>
  );
};

export { DeleteButton };
