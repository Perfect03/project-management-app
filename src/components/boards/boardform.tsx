import React, { FC, Dispatch, SetStateAction } from 'react';
import './boards.scss';
import { useFormik } from 'formik';
import BoardApi from '../../api/board';
import { IBoard } from 'interfaces/api';
import { useDispatch } from 'react-redux';
import { boardsReducer, isLoadingReducer } from 'helpers/redux/boardsDataSlice';
import { toggleLinks } from './newboard/new-board';
import { useTranslation } from 'react-i18next';
import { IToastStatus } from 'interfaces/toast';
import { toast } from 'react-toastify';

const BoardForm: FC<{
  setModal: Dispatch<SetStateAction<boolean>>;
  action: string;
  elem: string;
}> = ({ setModal, action, elem }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const toastPromise = (status: IToastStatus) => {
    if (status == 'success') toast['success'](t('Board created'));
    if (status == 'info') toast['info'](t('Board renamed'));
  };
  const formik = useFormik({
    initialValues: {
      title: '',
      owner: '',
      users: [],
    } as IBoard,

    onSubmit: async (values, { resetForm }) => {
      dispatch(isLoadingReducer(true));
      setModal(false);
      if (action == 'edit') {
        await BoardApi.updateBoardById(elem, values);
        toastPromise('info');
      } else if (action == 'create') {
        await BoardApi.createBoard(values);
        toastPromise('success');
      }
      const boards = await BoardApi.getAllBoards();
      dispatch(boardsReducer(boards));
      toggleLinks(false);
      resetForm({});
      dispatch(isLoadingReducer(false));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input
          onChange={formik.handleChange}
          value={formik.values.title}
          className="board-modal__input"
          placeholder={`${t("Board's name")}`}
          id="title"
          type="text"
        />
        <input
          onChange={formik.handleChange}
          value={formik.values.owner}
          className="board-modal__input"
          placeholder={`${t('Owner')}`}
          id="owner"
          type="text"
        />
        <input
          onChange={formik.handleChange}
          value={formik.values.users}
          className="board-modal__input"
          placeholder={`${t('Add users')}`}
          id="users"
          type="text"
        />
        <section className="board-modal-box-button">
          <button className="board-modal__button save" type="submit">
            {t('SAVE')}
          </button>
        </section>
      </form>
    </>
  );
};

export { BoardForm };
