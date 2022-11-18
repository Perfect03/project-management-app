import React from 'react';
import './profile.scss';
import '../forms/formStyles.scss';
import { isLoadingReducer, userReducer } from 'helpers/redux/userDataSlice';
import { useDispatch } from 'react-redux';
import UserApi from '../../api/user';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DeleteButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    dispatch(isLoadingReducer(true));
    UserApi.deleteUserById();
    const emptyUser = { _id: '', name: '', login: '' };
    dispatch(userReducer(emptyUser));
    dispatch(isLoadingReducer(false));
    navigate('/');
  };

  return (
    <button className="user-form__content-delete" onClick={handleClick}>
      {t('DELETE PROFILE')}
    </button>
  );
};

export { DeleteButton };
