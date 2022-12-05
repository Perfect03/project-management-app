import React, { FC, Dispatch, SetStateAction } from 'react';
import '../boards.scss';
import { useFormik } from 'formik';
import { IColumn } from 'interfaces/api';
import ColumnApi from '../../../api/columns';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { columnReducer, isLoadingReducer } from 'helpers/redux/selectedBoardSlice';
import { useTranslation } from 'react-i18next';
import { IToastStatus } from 'interfaces/toast';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

const AddColumn: FC<{
  setModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setModal }) => {
  const params = useParams();
  const current = params.id as string;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const toastPromise = (status: IToastStatus) => {
    if (status == 'success') toast['success'](t('Column created'));
    if (status == 'off') toast['error'](t('Connection error'));
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      order: 0,
    } as IColumn,

    onSubmit: async (values, { resetForm }) => {
      try {dispatch(isLoadingReducer(true));
      setModal(false);
      const columns = await ColumnApi.getColumnsInBoard(current);
      values.order = columns.length + 1;
      await ColumnApi.createColumnInBoard(current, values);
      toastPromise('success');
      dispatch(columnReducer(columns));
      resetForm({});}
      catch (error) {
        if (!((error as AxiosError).response?.status)) toastPromise('off');
      }
      dispatch(isLoadingReducer(false));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input
          onChange={formik.handleChange}
          value={formik.values.title}
          className="board-modal__input"
          placeholder={`${t('Title')}`}
          id="title"
          type="text"
        />
        <section className="board-modal-box-button">
          <button className="board-modal__button save" type="submit">
            {t('SAVE')}
          </button>
        </section>
      </form>
    </>
  );
};

export { AddColumn };
