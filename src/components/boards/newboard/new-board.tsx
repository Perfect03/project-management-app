import { IBoard } from 'interfaces/api';
import React, { FC, Dispatch, SetStateAction, useState } from 'react';
import './newboard.scss';
import { DeleteBoard } from '../deleteboard/deleteboard';
import { Modal } from 'components/modal/Modal';
import { BoardForm } from '../boardform';
import { useNavigate } from 'react-router-dom';

const NewBoard: FC<{
  values: IBoard;
  setModal: Dispatch<SetStateAction<boolean>>;
  isModal: boolean;
}> = ({ values }) => {
  const [isModalEdit, setModalEdit] = useState(false);
  const [isModalDel, setModalDel] = useState(false);
  const navigate = useNavigate();
  const handleChangeEdit = () => {
    setModalEdit(true);
  };
  const handleChangeDelete = () => {
    setModalDel(true);
  };
  return (
    <>
      <li>
        <a>
          <div className="board" data-id={values._id}>
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
        </a>
      </li>
      {isModalDel && (
        <Modal
          isVisible={isModalDel}
          title=""
          content={<DeleteBoard setModalDel={setModalDel} />}
          onClose={() => setModalDel(false)}
        />
      )}
      {isModalEdit && (
        <Modal
          isVisible={isModalEdit}
          title="Edit your board:"
          content={<BoardForm setModal={setModalEdit} />}
          onClose={() => setModalEdit(false)}
        />
      )}
    </>
  );
};

export { NewBoard };
