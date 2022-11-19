import React, { Dispatch, SetStateAction } from 'react';
import TaskApi from '../../../api/task';
import ColumnApi from '../../../api/columns';
import BoardApi from '../../../api/board';
import './deleteboard.scss';
import { useParams } from 'react-router-dom';

const DeleteBoard = ({
  setModalDel,
  action,
  elem,
}: {
  setModalDel: Dispatch<SetStateAction<boolean>>;
  action: string;
  elem: string;
}) => {
  const params = useParams();
  const currentBoard = params.id as string;

  async function onSubmit() {
    if (action == 'task') {
      await TaskApi.deleteTaskById(currentBoard, elem, elem);
    } else if (action == 'column') {
      await ColumnApi.deleteColumnById(currentBoard, elem);
    } else if (action == 'board') {
      await BoardApi.deleteBoardById(currentBoard);
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
