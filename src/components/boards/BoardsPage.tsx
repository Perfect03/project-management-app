import React, { useState, useEffect } from 'react';
import './boards.scss';
import { Modal } from '../modal/Modal';
import { NewBoard } from './newboard/new-board';
import { IBoard } from 'interfaces/api';
import { BoardForm } from './boardform';
import { Link } from 'react-router-dom';
import BoardApi from '../../api/board';

export const boardsStore = [] as Array<IBoard>;

const BoardsPage = () => {
  const [isModal, setModal] = useState(false);
  const [isBoards, setBoards] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await BoardApi.getAllBoards();
      setBoards(data);
      return data;
    })();
    return () => {
      console.error;
    };
  }, []);

  return (
    <>
      <section className="boards">
        <ul className="boards-table">
          {isBoards.map((board) => (
            <Link key={isBoards.indexOf(board)} to={`/boards/${board}`}>
              <NewBoard
                values={board}
                key={isBoards.indexOf(board)}
                setModal={setModal}
                isModal={isModal}
              />
            </Link>
          ))}
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
