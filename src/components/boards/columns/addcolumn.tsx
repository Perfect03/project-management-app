import React, { FC, Dispatch, SetStateAction } from 'react';
import '../boards.scss';
import { useFormik } from 'formik';
import { IColumn } from 'interfaces/api';
import ColumnApi from '../../../api/columns';
import { useParams } from 'react-router-dom';

const AddColumn: FC<{ setModal: Dispatch<SetStateAction<boolean>> }> = ({ setModal }) => {
  const params = useParams();
  const current = params.id as string;

  const formik = useFormik({
    initialValues: {
      title: '',
      order: 0,
    } as IColumn,

    onSubmit: async (values, { resetForm }) => {
      await ColumnApi.createColumnInBoard(current, values);
      setModal(false);
      resetForm({});
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
