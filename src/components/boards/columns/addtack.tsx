import React, { FC, Dispatch, SetStateAction } from 'react';
import { useFormik } from 'formik';
import { ITask, IColumn } from 'interfaces/api';
import TaskApi from '../../../api/task';
import { useParams } from 'react-router-dom';
import { taskReducer } from 'helpers/redux/selectedBoardSlice';
import { useDispatch } from 'react-redux';
import { isLoadingReducer } from 'helpers/redux/selectedBoardSlice';
import { useTranslation } from 'react-i18next';
import { IToastStatus } from 'interfaces/toast';
import { toast } from 'react-toastify';

const AddTask: FC<{
  setModal: Dispatch<SetStateAction<boolean>>;
  currentColumn: IColumn;
}> = ({ setModal, currentColumn }) => {
  const params = useParams();
  const current = params.id as string;
  const column = currentColumn._id as string;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const toastPromise = (status: IToastStatus) => {
    if (status == 'success') toast['success'](t('Task created'));
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      order: 0,
      description: '',
      userId: 0,
      users: [],
    } as ITask,

    onSubmit: async (values, { resetForm }) => {
      dispatch(isLoadingReducer(true));
      setModal(false);
      const tasks = await TaskApi.getTasksInColumn(current, column);
      values.order = tasks.length + 1;
      await TaskApi.createTaskInColumn(current, column, values);
      toastPromise('success');
      dispatch(taskReducer(tasks));
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
          placeholder={`${t('Task title')}`}
          id="title"
          type="text"
        />
        <input
          onChange={formik.handleChange}
          value={formik.values.description}
          className="board-modal__input"
          placeholder={`${t('Description')}`}
          id="description"
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

export { AddTask };
