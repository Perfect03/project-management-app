import React, { useState } from 'react';
import './boards.scss';
import { Modal } from '../modal/Modal';
import { NewBoard } from './newboard/new-board';
import { IBoard } from 'interfaces/api';
import { BoardForm } from './boardform';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { IGetState } from 'interfaces/redux';
import { Link } from 'react-router-dom';

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
          <>
            {boardsStore.map((values) => {
              return (
                <li key={values._id} onChange={(e) => e.stopPropagation()}>
                  <Link key={values._id} to={`/boards/${values._id}`}>
                    <NewBoard
                      values={values}
                      key={values._id}
                      setModal={setModal}
                      isModal={isModal}
                    />
                  </Link>
                </li>
              );
            })}
          </>
          <li>
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
    </>
  );
};

export { BoardsPage };
