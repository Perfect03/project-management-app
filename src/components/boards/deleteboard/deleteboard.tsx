import React, { Dispatch, SetStateAction } from 'react';
import TaskApi from '../../../api/task';
import ColumnApi from '../../../api/columns';
import BoardApi from '../../../api/board';
import './deleteboard.scss';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { boardsReducer } from 'helpers/redux/boardsDataSlice';
import { columnReducer } from 'helpers/redux/selectedBoardSlice';

const DeleteBoard = ({
  setModalDel,
  action,
  elem,
}: {
  setModalDel: Dispatch<SetStateAction<boolean>>;
  action: string;
  elem: string;
}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const currentBoard = params.id as string;

  async function onSubmit() {
    if (action == 'task') {
      console.log('удаляем таск', elem);
      await TaskApi.deleteTaskById(currentBoard, elem, elem);
    } else if (action == 'column') {
      await ColumnApi.deleteColumnById(currentBoard, elem);
      const column = await ColumnApi.getColumnsInBoard(currentBoard);
      dispatch(columnReducer(column));
    } else if (action == 'board') {
      await BoardApi.deleteBoardById(elem);
      const boards = await BoardApi.getAllBoards();
      dispatch(boardsReducer(boards));
    }
    setModalDel(false);
  }

  return (
    <>
      <h1 className="delete-board-h1"> ARE YOU SURE?</h1>
      <div className="delete-board-img"></div>
      <button className="delete-board-btn" type="submit" onClick={onSubmit}>
        DELETE
      </button>
    </>
  );
};

export { DeleteBoard };
