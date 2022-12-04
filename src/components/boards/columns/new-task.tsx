import React, { FC, useState } from 'react';
import { ITask, IColumn } from 'interfaces/api';
import { DeleteBoard } from '../deleteboard/deleteboard';
import { Modal } from 'components/modal/Modal';
import { useDispatch } from 'react-redux';
import './task.scss';
import TaskApi from '../../../api/task';
import { BurgerTask } from '../burger-for-task/burger-for-task';
import { isLoadingReducer } from 'helpers/redux/selectedBoardSlice';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { IToastStatus } from '../../../interfaces/toast';

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
  const [isBurger, setBurger] = useState(false);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const toastPromise = (status: IToastStatus) => {
    if (status == 'warn') toast['warn'](t('Task removed'));
  };

  const handleChangeDelete = () => {
    setModalDel(true);
  };

  const handleChangeBurger = () => {
    setBurger(true);
  };

  const deleteColumn = async () => {
    dispatch(isLoadingReducer(true));
    const TaskId = taskData._id as string;
    const ColumnId = taskData.columnId as string;
    const BoardId = taskData.boardId as string;
    await TaskApi.deleteTaskById(BoardId, ColumnId, TaskId);
    toastPromise('warn');
    dispatch(isLoadingReducer(false));
  };

  return (
    <>
      <li className="placeholder">
        <div
          className="task"
          draggable={true}
          onDragStart={(e: React.DragEvent<HTMLElement>) => {
            taskDragStartHandler(e, taskData, columnData);
          }}
          onDragLeave={(e: React.DragEvent<HTMLElement>) => {
            taskDragLeaveHandler(e, taskData);
          }}
          onDragEnd={(e: React.DragEvent<HTMLElement>) => {
            taskDragEndHandler(e);
          }}
          onDragOver={(e: React.DragEvent<HTMLElement>) => {
            taskDragOverHandler(e);
          }}
          onDrop={(e: React.DragEvent<HTMLElement>) => {
            taskDropHandler(e, taskData);
          }}
        >
          <div className="task-info">
            <h3 className="task-info-title" onClick={handleChangeBurger}>
              {taskData.title}
            </h3>
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
      {isBurger && (
        <BurgerTask isVisible={isBurger} onClose={() => setBurger(false)} values={taskData} />
      )}
    </>
  );
};

export { NewTask };
