import React, { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IColumn, ITask } from 'interfaces/api';
import { DeleteBoard } from '../deleteboard/deleteboard';
import { Modal } from 'components/modal/Modal';
import './column.scss';
import { AddTask } from './addtack';
import { NewTask } from './new-task';
import TaskApi from '../../../api/task';
import ColumnApi from '../../../api/columns';
import { ChangeTitle } from './column-title';
import { useSelector } from 'react-redux';
import { Reorder } from 'framer-motion';
import { IGetState } from 'interfaces/redux';
import { isCurrentTask } from 'helpers/redux/currentDragItemSlice';
import { isCurrentColumn } from 'helpers/redux/currentDragItemSlice';
import { isLoadingReducer } from 'helpers/redux/selectedBoardSlice';
import { CurrentDragItemDefault } from 'consts/consts';
import { useTranslation } from 'react-i18next';
import { IToastStatus } from 'interfaces/toast';
import { toast } from 'react-toastify';

const NewColumn: FC<{
  columnData: IColumn;
  columnDragStartHandler: CallableFunction;
  columnDragEndHandler: CallableFunction;
  columnDragOverHandler: CallableFunction;
  columnDropHandler: CallableFunction;
}> = ({
  columnData,
  columnDragStartHandler,
  columnDragEndHandler,
  columnDragOverHandler,
  columnDropHandler,
}) => {
  const [isModalDel, setModalDel] = useState(false);
  const [isModalAdd, setModalAdd] = useState(false);
  const [ModalTitle, setModalTitle] = useState(false);
  const ColumnId = columnData._id as string;
  const BoardId = columnData.boardId as string;
  const [tasks, setTasks] = useState<ITask[]>([]);
  const isRerender = useSelector<IGetState>((state) => state.selectedBoard.isLoading) as boolean;
  const currentTask = useSelector<IGetState>((state) => state.currentDragItem.currentTask) as ITask;
  const currentColumn = useSelector<IGetState>(
    (state) => state.currentDragItem.currentColumnId
  ) as string;

  useEffect(() => {
    const getTask = async () => {
      const currentTasks = await TaskApi.getTasksInColumn(BoardId, ColumnId);
      setTasks(currentTasks);
    };
    getTask();
  }, [isRerender]);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const toastPromise = (status: IToastStatus) => {
    if (status == 'warn') toast['warn'](t('Column removed'));
  };

  const deleteColumn = async () => {
    await ColumnApi.deleteColumnById(BoardId, ColumnId);
    toastPromise('warn');
  };

  const handleChangeDelete = () => {
    setModalDel(true);
  };
  const handleChangeAdd = () => {
    setModalAdd(true);
  };

  const ChangeTitleColumn = () => {
    setModalTitle(true);
  };

  function dragStartHandler(e: React.DragEvent<HTMLElement>, task: ITask, column: IColumn) {
    dispatch(isCurrentTask(task));
    dispatch(isCurrentColumn(column._id));
    dispatch(isLoadingReducer(true));
  }

  function dragEndHandler(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    (e.target as HTMLElement).style.boxShadow = '-1px -1px 5px #fff, 1px 1px 5px #5c511a';
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLElement>, task: ITask) {
    e.preventDefault();

    if ((e.target as HTMLElement).className == 'task') {
      (e.target as HTMLElement).style.boxShadow = '-1px -1px 5px #fff, 1px 1px 5px #5c511a';
    } else if ((e.target as HTMLElement).parentElement?.className == 'task') {
      ((e.target as HTMLElement).parentElement as HTMLElement).style.boxShadow =
        '-1px -1px 5px #fff, 1px 1px 5px #5c511a';
    } else (e.target as HTMLElement).style.boxShadow = 'none';
  }

  async function dropHandler(e: React.DragEvent<HTMLElement>, task: ITask) {
    e.preventDefault();
    e.stopPropagation();

    if ((e.target as HTMLElement).className == 'task') {
      (e.target as HTMLElement).style.boxShadow = '-1px -1px 5px #fff, 1px 1px 5px #5c511a';
    } else if ((e.target as HTMLElement).parentElement?.className == 'task') {
      ((e.target as HTMLElement).parentElement as HTMLElement).style.boxShadow =
        '-1px -1px 5px #fff, 1px 1px 5px #5c511a';
    } else
      (
        ((e.target as HTMLElement).parentElement as HTMLElement).parentElement as HTMLElement
      ).style.boxShadow = '-1px -1px 5px #fff, 1px 1px 5px #5c511a';

    let currentColumnTasks = await TaskApi.getTasksInColumn(BoardId, currentColumn);
    currentColumnTasks = (currentColumnTasks as ITask[]).filter((el) => el._id !== currentTask._id);
    const newCurrentColumnTasks = (currentColumnTasks as ITask[]).map((el) => {
      if (el.order > currentTask.order) {
        return { ...el, order: el.order - 1 };
      }
      return el;
    });

    const newDropColumnTasks = (tasks as ITask[]).map((el) => {
      if (el.order > task.order) {
        return { ...el, order: el.order + 1 };
      }
      return el;
    });
    newDropColumnTasks.push({ ...currentTask, order: task.order + 1, columnId: task.columnId });
    await TaskApi.updateSetOfTasks(
      newCurrentColumnTasks.concat(newDropColumnTasks).map((e) => {
        return { _id: e._id as string, order: e.order, columnId: e.columnId as string };
      })
    );
    dispatch(isCurrentTask(CurrentDragItemDefault.currentTask));
    dispatch(isLoadingReducer(false));
  }

  async function dropCardHandler(e: React.DragEvent<HTMLElement>, column: IColumn) {
    e.preventDefault();
    e.stopPropagation();

    let currentColumnTasks = await TaskApi.getTasksInColumn(BoardId, currentColumn);
    currentColumnTasks = (currentColumnTasks as ITask[]).filter((el) => el._id !== currentTask._id);
    const newCurrentColumnTasks = (currentColumnTasks as ITask[]).map((el) => {
      if (el.order > currentTask.order) {
        return { ...el, order: el.order - 1 };
      }
      return el;
    });

    tasks.push({ ...currentTask, order: 1, columnId: column._id });
    await TaskApi.updateSetOfTasks(
      newCurrentColumnTasks.concat(tasks).map((e) => {
        return { _id: e._id as string, order: e.order, columnId: e.columnId as string };
      })
    );
    dispatch(isLoadingReducer(false));
  }

  function dragOverHandler(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    if ((e.target as HTMLElement).className == 'task')
      (e.target as HTMLElement).style.boxShadow = '0 4px 3px gray';
    if ((e.target as HTMLElement).parentElement?.className == 'task')
      ((e.target as HTMLElement).parentElement as HTMLElement).style.boxShadow = '0 4px 3px gray';
    if ((e.target as HTMLElement).parentElement?.parentElement?.className == 'task')
      (
        ((e.target as HTMLElement).parentElement as HTMLElement).parentElement as HTMLElement
      ).style.boxShadow = '0 4px 3px gray';
  }

  const sortTasks = (a: IColumn, b: IColumn) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };
  return (
    <>
      <Reorder.Item value={columnData}>
        <div
          className="column"
          draggable={true}
          onDragStart={(e: React.DragEvent<HTMLElement>) => {
            columnDragStartHandler(e, columnData);
          }}
          onDragLeave={(e: React.DragEvent<HTMLElement>) => {
            columnDragEndHandler(e);
          }}
          onDragEnd={(e: React.DragEvent<HTMLElement>) => {
            columnDragEndHandler(e);
          }}
          onDragOver={(e: React.DragEvent<HTMLElement>) => {
            columnDragOverHandler(e);
            dragOverHandler(e);
          }}
          onDrop={(e: React.DragEvent<HTMLElement>) => {
            currentTask == CurrentDragItemDefault.currentTask
              ? columnDropHandler(e, columnData)
              : dropCardHandler(e, columnData);
          }}
          data-id={ColumnId}
        >
          <div className="column-info">
            <button
              className="column-info-title"
              spellCheck="false"
              value={columnData.title}
              onClick={ChangeTitleColumn}
            >
              {columnData.title}
            </button>
            <button className="column-buttons-delete" onClick={handleChangeDelete}></button>
          </div>
          <ul className="column-tasllist">
            {tasks.sort(sortTasks).map((task) => {
              return (
                <NewTask
                  taskData={task}
                  columnData={columnData}
                  taskDragStartHandler={dragStartHandler}
                  taskDragEndHandler={dragEndHandler}
                  taskDragLeaveHandler={dragLeaveHandler}
                  taskDragOverHandler={dragOverHandler}
                  taskDropHandler={dropHandler}
                  key={task._id}
                />
              );
            })}
          </ul>
          <div className="column-buttons">
            <button className="column-buttons-add" onClick={handleChangeAdd}>
              + {t('Add task')}
            </button>
          </div>
        </div>
      </Reorder.Item>
      {ModalTitle && (
        <Modal
          isVisible={ModalTitle}
          title={t('Change title:')}
          content={<ChangeTitle setModalTitle={setModalTitle} column={columnData} />}
          onClose={() => setModalTitle(false)}
        />
      )}
      {isModalDel && (
        <Modal
          isVisible={isModalDel}
          title=""
          content={<DeleteBoard setModalDel={setModalDel} deleteSmth={deleteColumn} />}
          onClose={() => setModalDel(false)}
        />
      )}
      {isModalAdd && (
        <Modal
          isVisible={isModalAdd}
          title={t('Add new task:')}
          content={<AddTask setModal={setModalAdd} currentColumn={columnData} />}
          onClose={() => setModalAdd(false)}
        />
      )}
    </>
  );
};

export { NewColumn };
