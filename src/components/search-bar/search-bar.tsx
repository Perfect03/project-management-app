import React, { FormEvent } from 'react';
import './search-bar.scss';
import '../boards/boards.scss';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IGetState } from 'interfaces/redux';
import { IBoard } from 'interfaces/api';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const boards = useSelector<IGetState>((state) => state.boardsData.boards) as IBoard[];

  const boardsQuery = searchParams.get('boards') || '';

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const query = form.search.value;
    setSearchParams({ boards: query });
    console.log(boardsQuery);
    const findedBoards = boards.filter((el) => {
      return el.title.includes(boardsQuery);
    });
    console.log(findedBoards);
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
