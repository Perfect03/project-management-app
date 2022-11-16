import React, { Dispatch, SetStateAction } from 'react';
import './deleteboard.scss';

const DeleteBoard = ({ setModal }: { setModal: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <>
      <h1 className="delete-board-h1"> ARE YOU SURE?</h1>
      <div className="delete-board-img"></div>
      <button className="delete-board-btn" onClick={() => setModal(false)}>
        DELETE
      </button>
    </>
  );
};

export { DeleteBoard };
