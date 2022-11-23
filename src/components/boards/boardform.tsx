import React, { FC, Dispatch, SetStateAction } from 'react';
import './boards.scss';
import { useFormik } from 'formik';
import BoardApi from '../../api/board';
import { IBoard } from 'interfaces/api';
import { useDispatch } from 'react-redux';
import { boardsReducer, isLoadingReducer } from 'helpers/redux/boardsDataSlice';
import { toggleLinks } from './newboard/new-board';

const BoardForm: FC<{
  setModal: Dispatch<SetStateAction<boolean>>;
  action: string;
  elem: string;
}> = ({ setModal, action, elem }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: '',
      owner: '',
      users: [],
    } as IBoard,

    onSubmit: async (values, { resetForm }) => {
      dispatch(isLoadingReducer(true));
      if (action == 'edit') {
        await BoardApi.updateBoardById(elem, values);
      } else if (action == 'create') {
        await BoardApi.createBoard(values);
      }
      const boards = await BoardApi.getAllBoards();
      dispatch(boardsReducer(boards));
      toggleLinks(false);
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
