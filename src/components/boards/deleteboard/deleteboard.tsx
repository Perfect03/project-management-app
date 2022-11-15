import React from 'react';
import './deleteboard.scss';

const DeleteBoard = () => {
  return (
    <>
      <h1 className="delete-board-h1"> ARE YOU SURE?</h1>
      <div className="delete-board-img"></div>
      <button className="delete-board-btn">DELETE</button>
    </>
  );
};

export { DeleteBoard };
