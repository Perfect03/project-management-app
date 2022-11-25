import React, { FC, Dispatch, SetStateAction } from 'react';
import '../boards.scss';
import { useFormik } from 'formik';
import { IColumn } from 'interfaces/api';
import ColumnApi from '../../../api/columns';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { columnReducer, isLoadingReducer } from 'helpers/redux/selectedBoardSlice';

const AddColumn: FC<{
  setModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setModal }) => {
  const params = useParams();
  const current = params.id as string;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      order: 0,
    } as IColumn,

    onSubmit: async (values, { resetForm }) => {
      dispatch(isLoadingReducer(true));
      const columns = await ColumnApi.getColumnsInBoard(current);
      console.log(columns);
      values.order=columns.length+1;
      await ColumnApi.createColumnInBoard(current, values);
      dispatch(columnReducer(columns));
      setModal(false);
      resetForm({});
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
          placeholder="Title"
          id="title"
          type="text"
        />
        <section className="board-modal-box-button">
          <button className="board-modal__button save" type="submit">
            SAVE
          </button>
        </section>
      </form>
    </>
  );
};

export { AddColumn };
