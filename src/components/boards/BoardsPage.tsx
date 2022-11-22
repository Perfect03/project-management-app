import React, { useState, useEffect } from 'react';
import './boards.scss';
import { Modal } from '../modal/Modal';
import { NewBoard } from './newboard/new-board';
import { IBoard } from 'interfaces/api';
import { BoardForm } from './boardform';
import { Link } from 'react-router-dom';
import BoardApi from '../../api/board';
import { useSelector } from 'react-redux';
import { IGetState } from 'interfaces/redux';

const BoardsPage = () => {
  const [isModal, setModal] = useState(false);
  const [Boards, setBoards] = useState<IBoard[]>([]);
  const [numOfBoards, setnumOfBoards] = useState(false);
  const isRerender = useSelector<IGetState>((state) => state.boardsData.isLoading);
  useEffect(() => {
    const getBoards = async () => {
      const currentBoards = await BoardApi.getAllBoards();
      setBoards(currentBoards);
    };
    getBoards();
    setnumOfBoards(false);
  }, [numOfBoards, isRerender]);

  return (
    <>
      <section className="boards">
        <ul className="boards-table">
          <>
            {Boards.map((values) => {
              return (
                <li key={values._id + 'li'}>
                  <Link key={values._id + 'a'} to={`/boards/${values._id}`} className="ronyauProd">
                    <div className="board-link"></div>
                  </Link>
                  <NewBoard values={values} key={values._id} setnumOfBoards={setnumOfBoards} />
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
            content={
              <BoardForm
                setModal={setModal}
                action="create"
                elem=""
                setnumOfBoards={setnumOfBoards}
              />
            }
            onClose={() => setModal(false)}
          />
        )}
      </>
    </>
  );
};

export { BoardsPage };
