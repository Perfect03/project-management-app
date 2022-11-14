import React, { useState } from 'react';
import './boards.scss';
import { Modal } from './AddBoard';

const Boards = () => {
  const [isAddBoard, setAddBoard] = useState(false);
  return (
    <>
      <section className="boards">
        <ul className="boards-table">
          <li>
            <button className="boards-table__add" onClick={() => setAddBoard(true)}></button>
          </li>
        </ul>
      </section>
      <Modal
        isVisible={isAddBoard}
        title="Create new board:"
        content={
          <>
            <input className="board-modal__input" placeholder="Board's name" type="text" />
            <input className="board-modal__input" placeholder="Discription" type="text" />
            <input className="board-modal__input" placeholder="Add users" type="text" />
            <section className="board-modal-box-button">
              <button className="board-modal__button save">SAVE</button>
              <button className="board-modal__button back">BACK</button>
            </section>
          </>
        }
        onClose={() => setAddBoard(false)}
      />
    </>
  );
};

export { Boards };
