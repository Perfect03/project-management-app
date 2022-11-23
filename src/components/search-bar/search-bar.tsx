import React from 'react';
import './search-bar.scss';
import '../boards/boards.scss';

const SearchBar = () => {
  return (
    <>
      <form className="search-container" data-testid="form-search">
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
