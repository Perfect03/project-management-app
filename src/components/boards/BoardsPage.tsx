import React, { useState } from 'react';
import './boards.scss';
import { Modal } from '../modal/Modal';
import { useFormik } from 'formik';
import { NewBoard } from './newboard/new-board';
import { IBoard } from 'interfaces/api';

export const boardsStore = [] as Array<IBoard>;

const BoardsPage = () => {
  const [isAddBoard, setAddBoard] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      owner: '',
      users: [],
    },

    onSubmit: (values, { resetForm }) => {
      boardsStore.push(values);
      setAddBoard(false);
      resetForm({});
    },
  });

  return (
    <>
      <section className="boards">
        <ul className="boards-table">
          {boardsStore.map((values) => {
            return <NewBoard values={values} key={boardsStore.indexOf(values)} />;
          })}
          <li>
            <button className="boards-table__add" onClick={() => setAddBoard(true)}></button>
          </li>
        </ul>
      </section>
      <Modal
        isVisible={isAddBoard}
        title="Create new board:"
        content={
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
        }
        onClose={() => setAddBoard(false)}
      />
    </>
  );
};

export { BoardsPage };
