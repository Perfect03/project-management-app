import React, { Dispatch, SetStateAction } from 'react';
import './boards.scss';
import { useFormik } from 'formik';
import { boardsStore } from './BoardsPage';

const BoardForm = ({ setModal }: { setModal: Dispatch<SetStateAction<boolean>> }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      owner: '',
      users: [],
    },

    onSubmit: (values, { resetForm }) => {
      boardsStore.push(values);
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
          placeholder="Board's name"
          id="title"
          type="text"
        />
        <input
          onChange={formik.handleChange}
          value={formik.values.owner}
          className="board-modal__input"
          placeholder="Owner"
          id="owner"
          type="text"
        />
        <input
          onChange={formik.handleChange}
          value={formik.values.users}
          className="board-modal__input"
          placeholder="Add users"
          id="users"
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

export { BoardForm };
