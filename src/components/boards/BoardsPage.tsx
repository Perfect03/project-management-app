import React, { useEffect, useState } from 'react';
import './boards.scss';
import { Modal } from '../modal/Modal';
import { useFormik } from 'formik';
import { NewBoard } from './newboard/new-board';
import { IBoard } from 'interfaces/api';
import BoardApi from '../../api/board';
import { useDispatch, useSelector } from 'react-redux';
import { boardsReducer, isLoadingReducer } from 'helpers/redux/boardsDataSlice';
import { IGetState } from 'interfaces/redux';

const BoardsPage = () => {
  const [isAddBoard, setAddBoard] = useState(false);

  const dispatch = useDispatch();
  const boardsStore = useSelector<IGetState>((state) => state.boardsData.boards) as IBoard[];

  useEffect(() => {
    dispatch(isLoadingReducer(true));
    BoardApi.getAllBoards().then((data) => dispatch(boardsReducer(data)));
    dispatch(isLoadingReducer(false));
  }, []);

  const formik = useFormik({
    initialValues: {
      title: '',
      owner: '',
      users: [],
    },

    onSubmit: async (values, { resetForm }) => {
      dispatch(isLoadingReducer(true));
      await BoardApi.createBoard(values);
      BoardApi.getAllBoards().then((data) => dispatch(boardsReducer(data)));
      setAddBoard(false);
      resetForm({});
      dispatch(isLoadingReducer(false));
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
              required
            />
            <input
              onChange={formik.handleChange}
              value={formik.values.owner}
              className="board-modal__input"
              placeholder="Owner"
              id="owner"
              type="text"
              required
            />
            <input
              onChange={formik.handleChange}
              value={formik.values.users}
              className="board-modal__input"
              placeholder="Add users"
              id="users"
              type="text"
              required
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
