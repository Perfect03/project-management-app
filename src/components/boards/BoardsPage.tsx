import React, { useState } from 'react';
import './boards.scss';
import { Modal } from '../modal/Modal';
import { NewBoard } from './newboard/new-board';
import { IBoard } from 'interfaces/api';
import { BoardForm } from './boardform';
import { useSelector } from 'react-redux';
import { IGetState } from 'interfaces/redux';
import { Link } from 'react-router-dom';

const BoardsPage = () => {
  const [isModal, setModal] = useState(false);

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
                <li key={values._id + 'li'}>
                  <Link key={values._id + 'a'} to={`/boards/${values._id}`}>
                    <div className="board-link"></div>
                  </Link>
                  <NewBoard
                    values={values}
                    key={values._id}
                    setModal={setModal}
                    isModal={isModal}
                  />
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
            content={<BoardForm setModal={setModal} action="create" elem="" />}
            onClose={() => setModal(false)}
          />
        )}
      </>
    </>
  );
};

export { BoardsPage };
