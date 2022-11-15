import { IBoard } from 'interfaces/api';
import React, { FC, useState } from 'react';
import './newboard.scss';
import { DeleteBoard } from '../deleteboard/deleteboard';
import { Modal } from 'components/modal/Modal';
import { BoardForm } from '../boardform';

const NewBoard: FC<{ values: IBoard }> = ({ values }) => {
  const [isDeleteBoard, setDeleteBoard] = useState(false);
  const [isAddBoard, setAddBoard] = useState(false);

  return (
    <>
      <li>
        <a>
          <div className="board">
            <div className="board-img"></div>
            <div className="board-info">
              <h3 className="board-info-title">{values.title}</h3>
              <p className="board-info-owner">{values.owner}</p>
              <p className="board-info-users">{values.users}</p>
            </div>
            <div className="board-buttons">
              <button className="board-buttons-edit" onClick={() => setAddBoard(true)}></button>
              <button
                className="board-buttons-delete"
                onClick={() => setDeleteBoard(true)}
              ></button>
            </div>
          </div>
        </a>
      </li>
      <Modal
        isVisible={isAddBoard}
        title="Edit board:"
        content={
          <>
            <BoardForm />
          </>
        }
        onClose={() => setAddBoard(false)}
      />
      <Modal
        isVisible={isDeleteBoard}
        title="Edit your board:"
        content={
          <>
            <DeleteBoard />
          </>
        }
        onClose={() => setDeleteBoard(false)}
      />
    </>
  );
};

export { NewBoard };
