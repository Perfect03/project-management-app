import React, { useState, useEffect } from 'react';
import './boards.scss';
import { Modal } from '../modal/Modal';
import { NewBoard } from './newboard/new-board';
import { IBoard } from 'interfaces/api';
import { BoardForm } from './boardform';
import { Link, useNavigate } from 'react-router-dom';
import BoardApi from '../../api/board';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingReducer } from 'helpers/redux/userDataSlice';
import { IGetState } from 'interfaces/redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { IToastStatus } from 'interfaces/toast';
import { AxiosError } from 'axios';
import { SearchBar } from 'components/search-bar/search-bar';

const BoardsPage = () => {
  const isAuth = useSelector<IGetState>((state) => state.userData.isAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModal, setModal] = useState(false);
  const [Boards, setBoards] = useState<IBoard[]>([]);
  const isRerender = useSelector<IGetState>((state) => state.boardsData.isLoading) as boolean;

  const { t } = useTranslation();

  const toastPromise = (status: IToastStatus) => {
    if (status == 'off') toast['error'](t('Connection error'));
  };

  const findedBoards = useSelector<IGetState>((state) => state.searchData.findedBoards) as IBoard[];

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
      return;
    }
    const getBoards = async () => {
      try {
        dispatch(isLoadingReducer(true));
        const currentBoards = await BoardApi.getAllBoards();
        setBoards(currentBoards);
      } catch (error) {
        if (!(error as AxiosError).response?.status) toastPromise('off');
      }
      dispatch(isLoadingReducer(false));
    };
    getBoards();
  }, [isRerender, findedBoards]);

  return (
    <>
      <section className="boards">
        <SearchBar />
        <ul className="boards-table">
          <>
            {!findedBoards.length
              ? Boards.map((values) => {
                  return (
                    <li key={values._id + 'li'}>
                      <Link
                        key={values._id + 'a'}
                        to={`/boards/${values._id}`}
                        className="ronyauProd"
                      >
                        <div className="board-link"></div>
                      </Link>
                      <NewBoard values={values} key={values._id} />
                    </li>
                  );
                })
              : findedBoards.map((values) => {
                  return (
                    <li key={values._id + 'li'}>
                      <Link
                        key={values._id + 'a'}
                        to={`/boards/${values._id}`}
                        className="ronyauProd"
                      >
                        <div className="board-link"></div>
                      </Link>
                      <NewBoard values={values} key={values._id} />
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
            title={t('Create new board:')}
            content={<BoardForm setModal={setModal} action="create" elem="" />}
            onClose={() => setModal(false)}
          />
        )}
      </>
    </>
  );
};

export { BoardsPage };
