import { IColumn } from 'interfaces/api';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { isLoadingReducer } from 'helpers/redux/selectedBoardSlice';
import { IToastStatus } from 'interfaces/toast';
import { toast } from 'react-toastify';
import ColumnApi from '../../../api/columns';

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
  };

  async function onSubmit() {
    dispatch(isLoadingReducer(true));
    const ColumnId = column._id as string;
    const BoardId = column.boardId as string;
    column.title = title;
    const temp = {
      title: title,
      order: column.order,
    };
    setModalTitle(false);
    await ColumnApi.updateColumnById(BoardId, ColumnId, temp);
    toastPromise('info');
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
