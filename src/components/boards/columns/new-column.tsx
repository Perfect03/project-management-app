import React, { FC, useState, useEffect } from 'react';
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
import { IGetState } from 'interfaces/redux';

const NewColumn: FC<{
  values: IColumn;
  columnDragStartHandler: CallableFunction;
  columnDragEndHandler: CallableFunction;
  columnDragOverHandler: CallableFunction;
  columnDropHandler: CallableFunction;
}> = ({ values, columnDragStartHandler, columnDragEndHandler, columnDragOverHandler, columnDropHandler }) => {
  const [isModalDel, setModalDel] = useState(false);
  const [isModalAdd, setModalAdd] = useState(false);
  const [ModalTitle, setModalTitle] = useState(false);
  const ColumnId = values._id as string;
  const BoardId = values.boardId as string;
  const [tasks, setTasks] = useState<ITask[]>([]);
  const isRerender = useSelector<IGetState>((state) => state.selectedBoard.isLoading) as boolean;
  const [currentTask, setCurrentTask] = useState(tasks[0]);

  useEffect(() => {
    const getTask = async () => {
      const currentTasks = await TaskApi.getTasksInColumn(BoardId, ColumnId);
      setTasks(currentTasks);
    };
    getTask();
  }, [isRerender]);

  const deleteColumn = async () => {
    await ColumnApi.deleteColumnById(BoardId, ColumnId);
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

  function dragStartHandler(e: React.DragEvent<HTMLElement>, task: ITask) {
    setCurrentTask(task);
    // (e.currentTarget as HTMLElement).style.backgroundColor='lightgray';
    //changeElementChildsColor(e.currentTarget as HTMLElement, 'lightgray');
  }

  function dragEndHandler(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    // (e.currentTarget as HTMLElement).style.backgroundColor='white';
    //changeElementChildsColor(e.currentTarget as HTMLElement, 'white');
  }

  async function dropHandler(e: React.DragEvent<HTMLElement>, card: IColumn) {
    e.preventDefault();
    const newTasks = tasks.map(e => {
      if(e._id === card._id) {
        return {...e, order: currentTask.order}
      }
      if(e._id === currentTask._id) {
        return {...e, order: card.order}
      }
      return e;
    });
    setTasks(newTasks);
    await TaskApi.updateSetOfTasks(newTasks.map(e => {
      if(e._id === card._id) {
        return {_id: e._id as string, order: currentTask.order, columnId: e.columnId as string}
      }
      if(e._id === currentTask._id) {
        return {_id: e._id as string, order: card.order, columnId: e.columnId as string}
      }
      return {_id: e._id as string, order: e.order, columnId: e.columnId as string};
    }));
  }

  function dragOverHandler(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    //(e.currentTarget as HTMLElement).style.backgroundColor='lightgray';
    //changeElementChildsColor(e.currentTarget as HTMLElement, 'lightgray');
  }

  const sortTasks = (a: IColumn,b: IColumn) => {
    if(a.order > b.order) {
      return 1
    } else {
      return -1;
    }
  }

  return (
    <>
      <li
        draggable={true}
        onDragStart={(e: React.DragEvent<HTMLElement>) => {columnDragStartHandler(e, values)}}
      onDragLeave={(e: React.DragEvent<HTMLElement>) => {columnDragEndHandler(e)}}
      onDragEnd={(e: React.DragEvent<HTMLElement>) => {columnDragEndHandler(e)}}
      onDragOver={(e: React.DragEvent<HTMLElement>) => {columnDragOverHandler(e)}}
      onDrop={(e: React.DragEvent<HTMLElement>) => {columnDropHandler(e, values)}}
      >
        <div className="column" draggable="true" data-id={ColumnId}>
          <div className="column-info">
            <button
              className="column-info-title"
              spellCheck="false"
              value={values.title}
              onClick={ChangeTitleColumn}
            >
              {values.title}
            </button>
            <button className="column-buttons-delete" onClick={handleChangeDelete}></button>
          </div>
          <ul className="column-tasllist">
            {tasks.sort(sortTasks).map((values) => {
              return <NewTask values={values} 
              taskDragStartHandler={dragStartHandler}
              taskDragEndHandler={dragEndHandler}
              taskDragOverHandler={dragOverHandler}
              taskDropHandler={dropHandler}
              key={values._id} />;
            })}
          </ul>
          <div className="column-buttons">
            <button className="column-buttons-add" onClick={handleChangeAdd}>
              + Add task
            </button>
          </div>
        </div>
      </li>
      {ModalTitle && (
        <Modal
          isVisible={ModalTitle}
          title="Change title:"
          content={<ChangeTitle setModalTitle={setModalTitle} column={values} />}
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
          title="Add new task:"
          content={<AddTask setModal={setModalAdd} currentColumn={values} />}
          onClose={() => setModalAdd(false)}
        />
      )}
    </>
  );
};

export { NewColumn };
