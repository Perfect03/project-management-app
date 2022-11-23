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
        <input id="title" className="title-input" placeholder={'New title'} type="text" />
      </label>
      <div className="delete-board-img"></div>
      <button className="delete-board-btn" type="submit" onClick={onSubmit}>
        SAVE
      </button>
    </>
  );
};

export { ChangeTitle };
