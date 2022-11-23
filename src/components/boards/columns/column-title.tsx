import { IColumn } from 'interfaces/api';
import React, { Dispatch, SetStateAction, useState } from 'react';
import ColumnApi from '../../../api/columns';

const ChangeTitle = ({
  setModalTitle,
  column,
}: {
  setModalTitle: Dispatch<SetStateAction<boolean>>;
  column: IColumn;
}) => {
  const [title, setTitle] = useState('');
  async function onSubmit() {
    const ColumnId = column._id as string;
    const BoardId = column.boardId as string;
    column.title = title;
    console.log(column.boardId, column._id as string, column);
    await ColumnApi.updateColumnById(BoardId, ColumnId, column);
    setModalTitle(false);
  }

  return (
    <>
      <label className="user-form__label" htmlFor="title">
        <input
          id="title"
          className="board-modal__input"
          placeholder={'New title'}
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <button className="board-modal__button title-column" type="submit" onClick={onSubmit}>
        SAVE
      </button>
    </>
  );
};

export { ChangeTitle };
