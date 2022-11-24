import React, { FormEvent } from 'react';
import './search-bar.scss';
import '../boards/boards.scss';
import { useSelector } from 'react-redux';
import { IGetState } from 'interfaces/redux';
import { IBoard, ITask, ITasks } from 'interfaces/api';
import TaskApi from '../../api/task';

const SearchBar = () => {
  const boards = useSelector<IGetState>((state) => state.boardsData.boards) as IBoard[];

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const query: string = form.search.value;
    const allTasks: ITask[] = await getAllTasksInBoards(boards);
    findTasksByQuery(allTasks, query);
  };

  const getAllTasksInBoards = async (boards: IBoard[]) => {
    const result: ITasks = [];
    boards.forEach(async (el) => {
      const tasksInBoard: ITask[] = await TaskApi.getTasksByBoardId(el._id!);
      tasksInBoard.forEach((el) => result.push(el));
    });
    console.log(await result[0]);
    return result;
  };

  const findTasksByQuery = (tasks: ITasks, query: string) => {
    const result = tasks.filter((el) => {
      return el.title.includes(query) || el.description.includes(query) || el.users.includes(query);
    });
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
