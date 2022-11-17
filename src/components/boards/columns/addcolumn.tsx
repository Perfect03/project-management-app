import React, { FC, Dispatch, SetStateAction } from 'react';
import '../boards.scss';
import { useFormik } from 'formik';
import { columnStore } from '../openedboard/OpenedBoard';
import ColumnApi from '../../../api/columns';

const AddColumn: FC<{ setModal: Dispatch<SetStateAction<boolean>> }> = ({ setModal }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      order: 0,
      boardId: '',
    },

    onSubmit: (values, { resetForm }) => {
      columnStore.push(values);
      //ColumnApi.createColumnInBoard('id', values);
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
