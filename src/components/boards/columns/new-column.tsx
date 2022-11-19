import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IColumn } from 'interfaces/api';
import { DeleteBoard } from '../deleteboard/deleteboard';
import { Modal } from 'components/modal/Modal';
import './column.scss';
import { AddTask } from './addtack';
import { NewTask } from './new-task';
import TaskApi from '../../../api/task';

const NewColumn = ({ values }: { values: IColumn }) => {
  const [isModalDel, setModalDel] = useState(false);
  const [isModalAdd, setModalAdd] = useState(false);
  const params = useParams();
  const currentBoard = params.id as string;
  const ColumnId = values._id as string;
  const [isTask, setTask] = useState([]);

  useEffect(() => {
    const getColumn = async () => {
      const tasks = await TaskApi.getTasksInColumn(currentBoard, ColumnId);
      setTask(tasks);
    };
    getColumn();
    return () => {};
  }, [currentBoard, ColumnId, values]);

  const handleChangeDelete = () => {
    setModalDel(true);
  };
  const handleChangeAdd = () => {
    setModalAdd(true);
  };

  return (
    <>
      <li>
        <div className="column" draggable="true" data-id={ColumnId}>
          <div className="column-info">
            <textarea
              className="column-info-title"
              spellCheck="false"
              maxLength={50}
              defaultValue={values.title}
            ></textarea>
            <button className="column-buttons-delete" onClick={handleChangeDelete}></button>
          </div>
          <ul className="column-tasllist">
            {isTask.map((values) => {
              return <NewTask values={values} key={isTask.indexOf(values)} />;
            })}
          </ul>
          <div className="column-buttons">
            <button className="column-buttons-add" onClick={handleChangeAdd}>
              + Add task
            </button>
          </div>
        </div>
      </li>
      {isModalDel && (
        <Modal
          isVisible={isModalDel}
          title=""
          content={<DeleteBoard setModalDel={setModalDel} action="column" elem={ColumnId} />}
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
