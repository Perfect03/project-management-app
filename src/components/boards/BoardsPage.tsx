import React, { useState } from 'react';
import './boards.scss';
import { Modal } from '../modal/Modal';
import { NewBoard } from './newboard/new-board';
import { IBoard } from 'interfaces/api';
import { BoardForm } from './boardform';

export const boardsStore = [] as Array<IBoard>;

const BoardsPage = () => {
  const [isModal, setModal] = useState(false);
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
          })}
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
