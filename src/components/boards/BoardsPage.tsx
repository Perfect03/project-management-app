import React, { useEffect, useState } from 'react';
import './boards.scss';
import { Modal } from '../modal/Modal';
import { NewBoard } from './newboard/new-board';
import { IBoard } from 'interfaces/api';
import { BoardForm } from './boardform';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { IGetState } from 'interfaces/redux';

const BoardsPage = () => {
  const [isModal, setModal] = useState(false);
  const { t } = useTranslation();

  const boardsStore = useSelector<IGetState>(
    (state) => state.boardsData.boards
  ) as unknown as IBoard[];

  return (
    <>
      <section className="boards">
        <ul className="boards-table">
          {boardsStore.map((values) => {
            return (
              <NewBoard
                values={values}
                key={boardsStore.indexOf(values)}
                setModal={setModal}
                isModal={isModal}
              />
            );
            return (
              <NewBoard
                values={values}
                key={boardsStore.indexOf(values)}
                setModal={setModal}
                isModal={isModal}
              />
            );
          })}
          <li>
            <button className="boards-table__add" onClick={() => setModal(true)}></button>
            <button className="boards-table__add" onClick={() => setModal(true)}></button>
          </li>
        </ul>
      </section>
      <>
        {isModal && (
          <Modal
            isVisible={isModal}
            title="Create new board:"
            content={<BoardForm setModal={setModal} action="create" />}
            onClose={() => setModal(false)}
          />
        )}
      </>
      <>
        {isModal && (
          <Modal
            isVisible={isModal}
            title="Create new board:"
            content={<BoardForm setModal={setModal} />}
            onClose={() => setModal(false)}
          />
        )}
      </>
    </>
  );
};

export { BoardsPage };
