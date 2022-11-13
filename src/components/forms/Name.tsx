import React, { FC } from 'react';

const Name: FC<{ value: string; onChange: React.ChangeEventHandler<HTMLInputElement> }> = ({
  value,
  onChange,
}) => {
  return (
    <label className="user-form__label" htmlFor="name">
      <input
        id="name"
        className="user-form__input"
        placeholder="Name"
        onChange={onChange}
        value={value}
        type="text"
      />
    </label>
  );
};

export { Name };
