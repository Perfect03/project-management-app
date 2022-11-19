import { IBoard } from 'interfaces/api';
import React, { FC, Dispatch, SetStateAction, useState } from 'react';
import './newboard.scss';
import { DeleteBoard } from '../deleteboard/deleteboard';
import { Modal } from 'components/modal/Modal';
import { BoardForm } from '../boardform';

const NewBoard: FC<{
  values: IBoard;
  setModal: Dispatch<SetStateAction<boolean>>;
  isModal: boolean;
}> = ({ values }) => {
  const [isModalEdit, setModalEdit] = useState(false);
  const [isModalDel, setModalDel] = useState(false);
  const boardId = values._id as string;

  const handleChangeEdit = (event) => {
    event.stopPropagation();
    setModalEdit(true);
  };
  const handleChangeDelete = (event) => {
    event.stopPropagation();
    setModalDel(true);
  };
  return (
    <>
      <li>
        <div className="board" data-id={boardId}>
          <div className="board-img"></div>
          <div className="board-info">
            <h3 className="board-info-title">{values.title}</h3>
            <p className="board-info-owner">{values.owner}</p>
            <p className="board-info-users">{values.users}</p>
          </div>
          <div className="board-buttons">
            <button className="board-buttons-edit" onClick={handleChangeEdit}></button>
            <button className="board-buttons-delete" onClick={handleChangeDelete}></button>
          </div>
        </div>
      </li>
      {isModalDel && (
        <Modal
          isVisible={isModalDel}
          title=""
          content={<DeleteBoard setModalDel={setModalDel} action="board" elem={boardId} />}
          onClose={() => setModalDel(false)}
        />
      )}
      {isModalEdit && (
        <Modal
          isVisible={isModalEdit}
          title="Edit your board:"
          content={<BoardForm setModal={setModalEdit} action="edit" />}
          onClose={() => setModalEdit(false)}
        />
      )}
    </>
  );
};

export { NewBoard };
