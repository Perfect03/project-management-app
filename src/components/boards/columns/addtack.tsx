import React, { FC, Dispatch, SetStateAction } from 'react';
import { useFormik } from 'formik';
import { ITask } from 'interfaces/api';

export const taskStore = [] as Array<ITask>;

const AddTask: FC<{ setModal: Dispatch<SetStateAction<boolean>> }> = ({ setModal }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      order: 0,
      description: '',
      userId: 0,
      users: [],
    },

    onSubmit: (values, { resetForm }) => {
      taskStore.push(values);
      //TaskApi.createBoard(values);
      setModal(false);
      resetForm({});
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input
          onChange={formik.handleChange}
          value={formik.values.title}
          className="board-modal__input"
          placeholder="Task title"
          id="title"
          type="text"
        />
        <input
          onChange={formik.handleChange}
          value={formik.values.description}
          className="board-modal__input"
          placeholder="Description"
          id="description"
          type="text"
        />
        <section className="board-modal-box-button">
          <button className="board-modal__button save" type="submit">
            SAVE
          </button>
        </section>
      </form>
    </>
  );
};

export { AddTask };
