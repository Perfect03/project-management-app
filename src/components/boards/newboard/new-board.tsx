import { IBoard } from 'interfaces/api';
import React, { FC } from 'react';
import './newboard.scss';

const NewBoard: FC<{ values: IBoard }> = ({ values }) => {
  return (
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
            <button className="board-buttons-edit"></button>
            <button className="board-buttons-delete"></button>
          </div>
        </div>
      </a>
    </li>
  );
};

export { NewBoard };
