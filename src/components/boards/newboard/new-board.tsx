import { IBoard } from 'interfaces/api';
import React, { FC } from 'react';
import './newboard.scss';
import BoardApi from '../../../api/board';
import { useDispatch } from 'react-redux';

const NewBoard: FC<{ values: IBoard }> = ({ values }) => {
  const dispatch = useDispatch();

  const handleClickEdit = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const boardId = evt.currentTarget.id;
  };

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
            <button
              className="board-buttons-edit"
              // id={values._id}
              onClick={(evt) => handleClickEdit}
            ></button>
            {/* <button className="board-buttons-delete" id={values._id}></button> */}
          </div>
        </div>
      </a>
    </li>
  );
};

export { NewBoard };
