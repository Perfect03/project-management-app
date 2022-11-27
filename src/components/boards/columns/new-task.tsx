import React, { FC, useState } from 'react';
import { ITask, IColumn } from 'interfaces/api';
import { DeleteBoard } from '../deleteboard/deleteboard';
import { Modal } from 'components/modal/Modal';
import './task.scss';
import TaskApi from '../../../api/task';

const NewTask: FC<{
  taskData: ITask;
  columnData: IColumn;
  taskDragStartHandler: CallableFunction;
  taskDragEndHandler: CallableFunction;
  taskDragLeaveHandler: CallableFunction;
  taskDragOverHandler: CallableFunction;
  taskDropHandler: CallableFunction;
}> = ({
  taskData,
  columnData,
  taskDragStartHandler,
  taskDragEndHandler,
  taskDragLeaveHandler,
  taskDragOverHandler,
  taskDropHandler,
}) => {
  const [isModalDel, setModalDel] = useState(false);

  const handleChangeDelete = () => {
    setModalDel(true);
  };

  const deleteColumn = async () => {
    const TaskId = taskData._id as string;
    const ColumnId = taskData.columnId as string;
    const BoardId = taskData.boardId as string;
    await TaskApi.deleteTaskById(BoardId, ColumnId, TaskId);
  };

  return (
    <>
      <li
        className="placeholder"
      >
        <div className="task" draggable={true}
        onDragStart={(e: React.DragEvent<HTMLElement>) => {
          taskDragStartHandler(e, taskData, columnData);
        }}
        onDragLeave={(e: React.DragEvent<HTMLElement>) => {
          taskDragLeaveHandler(e);
        }}
        onDragEnd={(e: React.DragEvent<HTMLElement>) => {
          taskDragEndHandler(e);
        }}
        onDragOver={(e: React.DragEvent<HTMLElement>) => {
          taskDragOverHandler(e);
        }}
        onDrop={(e: React.DragEvent<HTMLElement>) => {
          taskDropHandler(e, taskData);
        }}>
          <div className="task-info">
            <h3 className="task-info-title">{taskData.title}</h3>
            <button className="column-buttons-delete" onClick={handleChangeDelete}></button>
          </div>
          <p className="task-info-description">{taskData.description}</p>
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
