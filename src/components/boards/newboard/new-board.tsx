import { IBoard } from 'interfaces/api';
import React, { FC, useState } from 'react';
import './newboard.scss';
import { DeleteBoard } from '../deleteboard/deleteboard';
import { Modal } from 'components/modal/Modal';
import { BoardForm } from '../boardform';
import BoardApi from '../../../api/board';
import { useTranslation } from 'react-i18next';
import { IToastStatus } from 'interfaces/toast';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const toggleLinks = (condition: boolean) => {
  const allLinks = document.querySelectorAll('.ronyauProd');
  if (condition) {
    for (const link of allLinks) {
      (link as HTMLButtonElement).style.pointerEvents = 'none';
    }
  } else {
    for (const link of allLinks) {
      (link as HTMLButtonElement).style.pointerEvents = 'auto';
    }
  }
};

const NewBoard: FC<{
  values: IBoard;
}> = ({ values }) => {
  const [isModalEdit, setModalEdit] = useState(false);
  const [isModalDel, setModalDel] = useState(false);
  const boardId = values._id as string;

  const { t } = useTranslation();

  const toastPromise = (status: IToastStatus) => {
    if (status == 'warn') toast['warn'](t('Board removed'));
    if (status == 'off') toast['error'](t('Connection error'));
  };

  const deleteBoard = async () => {
    try {
      await BoardApi.deleteBoardById(boardId);
      toastPromise('warn');
    } catch (error) {
      if (!(error as AxiosError).response?.status) toastPromise('off');
    }
  };

  return (
    <>
      <div className="board" data-id={boardId}>
        <div className="board-img"></div>
        <div className="board-info">
          <h3 className="board-info-title">{values.title}</h3>
          <p className="board-info-owner">{values.owner}</p>
          <p className="board-info-users">{values.users}</p>
        </div>
        <div className="board-buttons">
          <button
            className="board-buttons-edit"
            onClick={(e) => {
              toggleLinks(true);
              e.preventDefault();
              setModalEdit(true);
            }}
          ></button>
          <button
            className="board-buttons-delete"
            onClick={(e) => {
              e.preventDefault();
              setModalDel(true);
            }}
          ></button>
        </div>
      </div>
      {isModalDel && (
        <Modal
          isVisible={isModalDel}
          title=""
          content={<DeleteBoard setModalDel={setModalDel} deleteSmth={deleteBoard} />}
          onClose={() => setModalDel(false)}
        />
      )}
      {isModalEdit && (
        <Modal
          isVisible={isModalEdit}
          title={t('Edit your board:')}
          content={<BoardForm setModal={setModalEdit} action="edit" elem={boardId} />}
          onClose={() => setModalEdit(false)}
        />
      )}
    </>
  );
};

export { NewBoard };
