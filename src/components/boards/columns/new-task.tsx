import React, { FC, useState } from 'react';
import { ITask } from 'interfaces/api';
import { DeleteBoard } from '../deleteboard/deleteboard';
import { Modal } from 'components/modal/Modal';
import './task.scss';
import TaskApi from '../../../api/task';

const NewTask: FC<{
  values: ITask;
  taskDragStartHandler: CallableFunction;
  taskDragEndHandler: CallableFunction;
  taskDragOverHandler: CallableFunction;
  taskDropHandler: CallableFunction;
}> = ({ values, taskDragStartHandler, taskDragEndHandler, taskDragOverHandler, taskDropHandler }) => {
  const [isModalDel, setModalDel] = useState(false);

  const handleChangeDelete = () => {
    setModalDel(true);
  };

  const deleteColumn = async () => {
    const TaskId = values._id as string;
    const ColumnId = values.columnId as string;
    const BoardId = values.boardId as string;
    await TaskApi.deleteTaskById(BoardId, ColumnId, TaskId);
  };

  return (
    <>
      <li draggable={true}
        onDragStart={(e: React.DragEvent<HTMLElement>) => {taskDragStartHandler(e, values)}}
      onDragLeave={(e: React.DragEvent<HTMLElement>) => {taskDragEndHandler(e)}}
      onDragEnd={(e: React.DragEvent<HTMLElement>) => {taskDragEndHandler(e)}}
      onDragOver={(e: React.DragEvent<HTMLElement>) => {taskDragOverHandler(e)}}
      onDrop={(e: React.DragEvent<HTMLElement>) => {taskDropHandler(e, values)}}
      className="placeholder">
        <div className="task" draggable="true">
          <div className="task-info">
            <h3 className="task-info-title">{values.title}</h3>
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
    </>
  );
};

export { NewTask };
