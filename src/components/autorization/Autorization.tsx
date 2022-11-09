import React, { FC } from 'react';
import './autorization.scss';

export const Autorization: FC = () => {
  return (
    <>
      <form className="searchContainer" data-testid="formSearch" id="searchApi">
        <button type="submit" className="searchButton" data-testid="searchButton">
          Search
        </button>
        <input
          data-testid="searchInput"
          name="user"
          type="text"
          className="search-bar"
          placeholder="Find some..."
        ></input>
      </form>
    </>
  );
};
