import React, { FC } from 'react';
import './burger-for-task.scss';

const BurgerTask: FC<{
  isVisible: boolean;
  onClose: () => void;
}> = ({ isVisible = false, onClose }) => {
  return !isVisible ? null : (
    <div className="burger" onClick={onClose}>
      <div className="burger-task" id="burger-task" onClick={(e) => e.stopPropagation()}>
        <label className="burger-task__label" htmlFor="title">
          <input
            id="title"
            className="burger-task__input burger-task__input__first"
            placeholder="Title"
            type="text"
          />
        </label>
        <label className="burger-task__label" htmlFor="description">
          <input
            id="description"
            className="burger-task__input burger-task__input__second"
            placeholder="Description"
            type="text"
          />
        </label>
        <button type="submit" className="burger-task__button">
          SAVE
        </button>
      </div>
    </div>
  );
};

export { BurgerTask };
