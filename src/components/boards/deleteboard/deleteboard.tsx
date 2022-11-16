import React, { Dispatch, SetStateAction } from 'react';
import './deleteboard.scss';

const DeleteBoard = ({ setModalDel }: { setModalDel: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <>
      <h1 className="delete-board-h1"> ARE YOU SURE?</h1>
      <div className="delete-board-img"></div>
      <button className="delete-board-btn" onClick={() => setModalDel(false)}>
        DELETE
      </button>
    </>
  );
};

export { DeleteBoard };
