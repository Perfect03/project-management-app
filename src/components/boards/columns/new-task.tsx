import React, { useState } from 'react';
import { ITask } from 'interfaces/api';
import { DeleteBoard } from '../deleteboard/deleteboard';
import { Modal } from 'components/modal/Modal';
import './task.scss';
import TaskApi from '../../../api/task';
import { BurgerTask } from '../burger-for-task/burger-for-task';

const NewTask = ({ values }: { values: ITask }) => {
  const [isModalDel, setModalDel] = useState(false);
  const [isBurger, setBurger] = useState(false);

  const handleChangeDelete = () => {
    setModalDel(true);
  };

  const handleChangeBurger = () => {
    setBurger(true);
  };

  const deleteColumn = async () => {
    const TaskId = values._id as string;
    const ColumnId = values.columnId as string;
    const BoardId = values.boardId as string;
    await TaskApi.deleteTaskById(BoardId, ColumnId, TaskId);
  };

  return (
    <>
      <li className="placeholder">
        <div className="task" draggable="true">
          <div className="task-info">
            <h3 className="task-info-title" onClick={handleChangeBurger}>
              {values.title}
            </h3>
            <button className="column-buttons-delete" onClick={handleChangeDelete}></button>
          </div>
          <p className="task-info-description">{values.description}</p>
        </div>
      </li>
      {isModalDel && (
        <Modal
          isVisible={isModalDel}
          title=""
          content={<DeleteBoard setModalDel={setModalDel} deleteSmth={deleteColumn} />}
          onClose={() => setModalDel(false)}
        />
      )}
      {isBurger && (
        <BurgerTask isVisible={isBurger} onClose={() => setBurger(false)} values={values} />
      )}
    </>
  );
};

export { NewTask };
