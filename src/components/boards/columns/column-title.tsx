import { IColumn } from 'interfaces/api';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { isLoadingReducer } from 'helpers/redux/selectedBoardSlice';
import { IToastStatus } from 'interfaces/toast';
import { toast } from 'react-toastify';
import ColumnApi from '../../../api/columns';
import { AxiosError } from 'axios';

const ChangeTitle = ({
  setModalTitle,
  column,
}: {
  setModalTitle: Dispatch<SetStateAction<boolean>>;
  column: IColumn;
}) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const toastPromise = (status: IToastStatus) => {
    if (status == 'info') toast['info'](t('Column renamed'));
    if (status == 'off') toast['error'](t('Connection error'));
  };

  async function onSubmit() {
    try {dispatch(isLoadingReducer(true));
      const temp = {
        title: title,
        order: column.order,
      };
      await ColumnApi.updateColumnById(column.boardId as string, column._id as string, temp);
    column.title = title;
    setModalTitle(false);
    toastPromise('info');}
    catch (error) {
      if (!((error as AxiosError).response?.status)) toastPromise('off');
    }
    dispatch(isLoadingReducer(false));
  }

  return (
    <>
      <label className="user-form__label" htmlFor="title">
        <input
          id="title"
          className="board-modal__input"
          placeholder={`${t('New title')}`}
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <button className="board-modal__button title-column" type="submit" onClick={onSubmit}>
        {t('SAVE')}
      </button>
    </>
  );
};

export { ChangeTitle };
