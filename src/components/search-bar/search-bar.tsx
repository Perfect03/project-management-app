import React, { FormEvent, useState } from 'react';
import './search-bar.scss';
import '../boards/boards.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IGetState } from 'interfaces/redux';
import { IBoard, ITasks } from 'interfaces/api';
import TaskApi from '../../api/task';
import BoardsApi from '../../api/board';
import { findedBoardsReducer } from 'helpers/redux/searchDataSlice';

const SearchBar = () => {
  const boards = useSelector<IGetState>((state) => state.boardsData.boards) as IBoard[];
  const dispatch = useDispatch();

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    let allTasks: ITasks = [];
    const form = evt.target as HTMLFormElement;
    const query: string = form.search.value;

    if (query) {
      const allBoardsId = boards.map((el) => {
        return el._id;
      }) as string[];

      allTasks = await getTasksByBoardId(allBoardsId);
      const findedTasks = findTasksByQuery(allTasks, query);

      if (!findedTasks.length) {
        form.search.value = '';
        form.search.placeholder = 'Nothing was found.';
      }
      getBoardsById(findedTasks);
    } else {
      dispatch(findedBoardsReducer([]));
    }
  };

  const getTasksByBoardId = async (ids: string[]) => {
    let result: ITasks = [];
    for (let i = 0; i < ids.length; i++) {
      const tasksInBoard = await TaskApi.getTasksByBoardId(ids[i]);
      result.push(tasksInBoard);
    }
    result = result.flat(1);
    return result;
  };

  const findTasksByQuery = (tasks: ITasks, query: string) => {
    const temp = tasks.filter((el) => {
      return (
        el.description.includes(query) ||
        el.title.includes(query) ||
        el.users.includes(query) ||
        el._id?.includes(query)
      );
    });
    return temp;
  };

  const getBoardsById = async (tasks: ITasks) => {
    const idsList = tasks.map((el) => el.boardId) as string[];
    const boards = await BoardsApi.getBoardByIdsList(idsList);
    dispatch(findedBoardsReducer(boards));
  };

  return (
    <>
      <form
        className="search-container"
        data-testid="form-search"
        onSubmit={(evt) => handleSubmit(evt)}
      >
        <button type="submit" className="search-button">
          Search
        </button>
        <input
          data-testid="board-modal__input search-input"
          name="search"
          type="text"
          className="search-bar"
          placeholder="Find some..."
        ></input>
      </form>
    </>
  );
};

export { SearchBar };
