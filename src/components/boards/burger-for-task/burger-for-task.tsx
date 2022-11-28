import React, { FC, useState } from 'react';
import './burger-for-task.scss';
import TaskApi from '../../../api/task';
import { ITask } from 'interfaces/api';

const BurgerTask: FC<{
  isVisible: boolean;
  onClose: () => void;
  values: ITask;
}> = ({ isVisible = false, onClose, values }) => {
  const [tasktitle, settaskTitle] = useState('');
  const [taskdescription, settaskdescription] = useState('');
  const burger_title = document.querySelector('.burger-task__input__first');
  console.log(burger_title);
  const burger_description = document.querySelector('.burger-task__input__second');
  console.log(burger_description);

  async function onSubmit() {
    const task = values;
    const ColumnId = values.columnId as string;
    const BoardId = values.boardId as string;
    task.title = tasktitle;
    task.description = taskdescription;
    const temp = {
      title: tasktitle,
      description: taskdescription,
      order: 0,
      userId: 0,
      users: [],
    };
    await TaskApi.updateTaskById(BoardId, ColumnId, temp);
    isVisible = false;
  }

  return !isVisible ? null : (
    <div className="burger" onClick={onClose}>
      <div className="burger-task" id="burger-task" onClick={(e) => e.stopPropagation()}>
        <label className="burger-task__label" htmlFor="title">
          <input
            id="title"
            className="burger-task__input burger-task__input__first"
            placeholder="Title"
            type="text"
            value={tasktitle}
            onChange={(event) => settaskTitle(event.target.value)}
          />
        </label>
        <label className="burger-task__label" htmlFor="description">
          <input
            id="description"
            className="burger-task__input burger-task__input__second"
            placeholder="Description"
            type="text"
            value={taskdescription}
            onChange={(event) => settaskdescription(event.target.value)}
          />
        </label>
        <button type="submit" className="burger-task__button" onClick={onSubmit}>
          SAVE
        </button>
      </div>
    </div>
  );
};

export { BurgerTask };
