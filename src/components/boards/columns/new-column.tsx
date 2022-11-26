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
import { IGetState, ICurrentDragItem } from 'interfaces/redux';
import { isCurrentTask } from 'helpers/redux/currentDragItemSlice'
import { isCurrentColumn } from 'helpers/redux/currentDragItemSlice'

const NewColumn: FC<{
  columnData: IColumn;
  columnDragStartHandler: CallableFunction;
  columnDragEndHandler: CallableFunction;
  columnDragOverHandler: CallableFunction;
  columnDropHandler: CallableFunction;
  columns: IColumn[];
}> = ({ columnData, columnDragStartHandler, columnDragEndHandler, columnDragOverHandler, columnDropHandler }) => {
  const [isModalDel, setModalDel] = useState(false);
  const [isModalAdd, setModalAdd] = useState(false);
  const [ModalTitle, setModalTitle] = useState(false);
  const ColumnId = columnData._id as string;
  const BoardId = columnData.boardId as string;
  const [tasks, setTasks] = useState<ITask[]>([]);
  const isRerender = useSelector<IGetState>((state) => state.selectedBoard.isLoading) as boolean;
  const currentTask = useSelector<IGetState>((state) => state.currentDragItem.currentTask) as ITask;
  const currentColumn = useSelector<IGetState>((state) => state.currentDragItem.currentColumnId) as string;


  useEffect(() => {
    const getTask = async () => {
      const currentTasks = await TaskApi.getTasksInColumn(BoardId, ColumnId);
      setTasks(currentTasks);
    };
    getTask();
  }, [isRerender]);

  const dispatch = useDispatch();

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

  function dragStartHandler(e: React.DragEvent<HTMLElement>, task: ITask, column: IColumn) {
    dispatch(isCurrentTask(task));
    dispatch(isCurrentColumn(column._id));
  }

  function dragEndHandler(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    //(e.target as HTMLElement).style.boxShadow='none';
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    //(e.target as HTMLElement).style.boxShadow='none';
  }

  async function dropHandler (e: React.DragEvent<HTMLElement>, task: ITask, column: IColumn) {
    e.preventDefault();
    e.stopPropagation();
    //console.log(await TaskApi.getTasksById(currentTask.boardId as string));

    //const allTasks = await TaskApi.getTasksById(BoardId);
    console.log(currentTask);
    let currentColumnTasks = await TaskApi.getTasksInColumn(BoardId, currentColumn);
    //let dropColumnTasks = await TaskApi.getTasksInColumn(BoardId, task.columnId as string);
    /*currentColumnTasks = (currentColumnTasks as ITask[]).map(e => {
      
    })console.log(task._id, task.columnId);
    const currentTaskIndex = (currentColumnTasks as ITask[]).map(el => {return el._id}).indexOf(currentTask._id);
    const dropTaskIndex = tasks.indexOf(task);*/

    console.log(currentColumnTasks, tasks, currentTask.order, task.order, task, currentTask);
    currentColumnTasks = (currentColumnTasks as ITask[]).filter((el) => el._id !== currentTask._id);
    const newCurrentColumnTasks=(currentColumnTasks as ITask[]).map(el => {
        if(el.order > currentTask.order)
        {
        return {...el, order: el.order-1 };
      }
      return el;
    })

    const newDropColumnTasks=(tasks as ITask[]).map(el => {
      if(el.order > task.order)
      {
        return {...el, order: el.order+1 };
      }
      return el;
    })
    newDropColumnTasks.push({...currentTask, order: task.order+1, columnId: task.columnId })
    console.log(newCurrentColumnTasks, newDropColumnTasks);
    setTasks(newDropColumnTasks);
    await TaskApi.updateSetOfTasks(newCurrentColumnTasks.concat(newDropColumnTasks).map(e => {
      return {_id: e._id as string, order: e.order, columnId: e.columnId as string};
    }));
    /*const newTasks = tasks.map(e => {
      if(e._id === task._id) {
        return {...e, columnId: currentTask.columnId, order: }
      }
      if(e._id === currentTask._id) {
        return {...e, columnId: task.columnId}
      }
      return e;
    })

    const allTasks = await TaskApi.getTasksById(currentTask.boardId as string);
    const currentTaskIndex = currentColumnTasks.indexOf(currentTask);
    TaskApi.updateSetOfTasks(currentColumnTasks.splice(currentIndex, 1));
    const dropColumnTasks = await TaskApi.getTasksById(task.boardId as string);
    TaskApi.updateSetOfTasks(dropColumnTasks.splice(dropIndex+1, 0, task));

    const newColumns = columns.map(e => {
      if(e._id === column._id) {
        return {...e, order: currentColumn.order}
      }
      if(e._id === currentColumn._id) {
        return {...e, order: card.order}
      }
      return e;
    });
    setTasks(newTasks);
    await TaskApi.updateSetOfTasks(newTasks.map(e => {
      if(e._id === task._id) {
        return {_id: currentTask._id as string, order: currentTask.order, columnId: currentTask.columnId as string}
      }
      if(e._id === currentTask._id) {
        return {_id: task._id as string, order: task.order, columnId: task.columnId as string}
      }
      return {_id: e._id as string, order: e.order, columnId: e.columnId as string};
    }));*/
  }

  function dragOverHandler(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    //if(e.target.className=='task') (e.target as HTMLElement).style.boxShadow='0 4px 3px gray';
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
        onDragStart={(e: React.DragEvent<HTMLElement>) => {columnDragStartHandler(e, columnData)}}
      onDragLeave={(e: React.DragEvent<HTMLElement>) => {columnDragEndHandler(e)}}
      onDragEnd={(e: React.DragEvent<HTMLElement>) => {columnDragEndHandler(e)}}
      onDragOver={(e: React.DragEvent<HTMLElement>) => {columnDragOverHandler(e)}}
      onDrop={(e: React.DragEvent<HTMLElement>) => {columnDropHandler(e, columnData)}}
      >
        <div className="column" draggable="true" data-id={ColumnId}>
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
              return <NewTask taskData={task} 
              columnData={columnData}
              taskDragStartHandler={dragStartHandler}
              taskDragEndHandler={dragEndHandler}
              taskDragLeaveHandler={dragLeaveHandler}
              taskDragOverHandler={dragOverHandler}
              taskDropHandler={dropHandler}
              key={task._id} />;
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
          title="Add new task:"
          content={<AddTask setModal={setModalAdd} currentColumn={columnData} />}
          onClose={() => setModalAdd(false)}
        />
      )}
    </>
  );
};

export { NewColumn };
