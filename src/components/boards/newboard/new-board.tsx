import { IBoard } from 'interfaces/api';
import React, { FC, Dispatch, SetStateAction } from 'react';
import './newboard.scss';
import { DeleteBoard } from '../deleteboard/deleteboard';
import { Modal } from 'components/modal/Modal';
import { BoardForm } from '../boardform';

const NewBoard = (
  { values }: { values: IBoard },
  { setModal }: { setModal: Dispatch<SetStateAction<boolean>> }
) => {
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
              <button className="board-buttons-edit" onClick={() => setModal(true)}></button>
              <button className="board-buttons-delete" onClick={() => setModal(true)}></button>
            </div>
          </div>
        </a>
      </li>
      {setModal ? (
        <Modal
          isVisible={true}
          title="Create new board:"
          content={<DeleteBoard setModal={setModal} />}
          onClose={() => setModal(false)}
        />
      ) : (
        <div></div>
      )}
      {setModal ? (
        <Modal
          isVisible={true}
          title="Create new board:"
          content={<BoardForm setModal={setModal} />}
          onClose={() => setModal(false)}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

export { NewBoard };
