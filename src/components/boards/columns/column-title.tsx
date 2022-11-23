import React, { Dispatch, SetStateAction } from 'react';

const ChangeTitle = ({
  setModalTitle,
  title,
}: {
  setModalTitle: Dispatch<SetStateAction<boolean>>;
  title: string;
}) => {
  function onSubmit() {
    console.log('HI');
    setModalTitle(false);
  }

  return (
    <>
      <label className="user-form__label" htmlFor="name">
        <input id="title" className="board-modal__input" placeholder={'New title'} type="text" />
      </label>
      <button className="board-modal__button title-column" type="submit" onClick={onSubmit}>
        SAVE
      </button>
    </>
  );
};

export { ChangeTitle };
