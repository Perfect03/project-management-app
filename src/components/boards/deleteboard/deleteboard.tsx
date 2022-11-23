import { isLoadingReducer } from 'helpers/redux/boardsDataSlice';
import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import './deleteboard.scss';

const DeleteBoard = ({
  setModalDel,
  deleteSmth,
}: {
  setModalDel: Dispatch<SetStateAction<boolean>>;
  deleteSmth: () => void;
}) => {
  const dispatch = useDispatch();
  async function onSubmit() {
    //dispatch(isLoadingReducer(false));
    deleteSmth();
    setModalDel(false);
    dispatch(isLoadingReducer(true));
  }

  return (
    <>
      <h1 className="delete-board-h1"> ARE YOU SURE?</h1>
      <div className="delete-board-img"></div>
      <button className="delete-board-btn" type="submit" onClick={onSubmit}>
        DELETE
      </button>
    </>
  );
};

export { DeleteBoard };
