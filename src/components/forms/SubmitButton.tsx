import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(`/`);
      }}
      className="user-form__button"
      data-testid="buttonForm"
      type="submit"
    >
      SUBMIT
    </button>
  );
};

export { SubmitButton };
