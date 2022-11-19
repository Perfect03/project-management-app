import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ITask } from 'interfaces/api';
import { DeleteBoard } from '../deleteboard/deleteboard';
import { Modal } from 'components/modal/Modal';
import './task.scss';

const NewTask = ({ values }: { values: ITask }) => {
  const [isModalDel, setModalDel] = useState(false);

  const { id } = useParams();
  const handleChangeDelete = () => {
    setModalDel(true);
  };

  return (
    <>
      <li>
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
          content={<DeleteBoard setModalDel={setModalDel} />}
          onClose={() => setModalDel(false)}
        />
      )}
    </>
  );
};

export { NewTask };
