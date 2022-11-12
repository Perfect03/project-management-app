import React from 'react';
import './header.scss';

const Language = () => {
  return (
    <select className="header-content__language">
      <option>EN</option>
      <option>RU</option>
    </select>
  );
};

export { Language };
