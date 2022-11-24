import React, { useState, useEffect } from 'react';
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

const NewColumn = ({ values }: { values: IColumn }) => {
  const [isModalDel, setModalDel] = useState(false);
  const [isModalAdd, setModalAdd] = useState(false);
  const [ModalTitle, setModalTitle] = useState(false);
  const ColumnId = values._id as string;
  const BoardId = values.boardId as string;
  const [tasks, setTasks] = useState<ITask[]>([]);
  const isRerender = useSelector<IGetState>((state) => state.selectedBoard.isLoading) as boolean;
  const [currentCard, setCurrentCard] = useState(null);

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

  function dragStartHandler(e: React.DragEvent<HTMLElement>, card: IColumn) {
    console.log('drag', card);
    setCurrentCard(card);
  }

function dragEndHandler(e: React.DragEvent<HTMLElement>) {
  
}

function dropHandler(e: React.DragEvent<HTMLElement>, card: IColumn) {
  e.preventDefault();
  console.log('drop', card);
}

function dragOverHandler(e: React.DragEvent<HTMLElement>) {
  e.preventDefault();
}

  return (
    <>
      <li draggable={true}
      onDragStart={(e: React.DragEvent<HTMLElement>) => {dragStartHandler(e, values)}}
      onDragLeave={(e: React.DragEvent<HTMLElement>) => {dragEndHandler(e)}}
      onDragEnd={(e: React.DragEvent<HTMLElement>) => {dragEndHandler(e)}}
      onDragOver={(e: React.DragEvent<HTMLElement>) => {dragOverHandler(e)}}
      onDrop={(e: React.DragEvent<HTMLElement>) => {dropHandler(e, values)}}
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
            {tasks.map((values) => {
              return <NewTask values={values} key={values._id} />;
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
