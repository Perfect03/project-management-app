import React, { FC, Dispatch, SetStateAction } from 'react';
import './boards.scss';
import { useFormik } from 'formik';
import { boardsStore } from './BoardsPage';
import BoardApi from '../../api/board';
import { IBoard } from 'interfaces/api';

const BoardForm: FC<{ setModal: Dispatch<SetStateAction<boolean>>; action: string }> = ({
  setModal,
  action,
}) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      owner: '',
      users: [],
      _id: '',
    } as IBoard,

    onSubmit: (values, { resetForm }) => {
      if (action == 'edit') {
        BoardApi.updateBoardById('6377e64f8b43bd0dfd2e6504', values);
      } else if (action == 'create') {
        boardsStore.push(values);
        BoardApi.createBoard(values);
      }
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
