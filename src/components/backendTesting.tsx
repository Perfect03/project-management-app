import React, { useEffect } from 'react';
import BoardApi from '../api/board';
export const BackendTestComponent = () => {
  useEffect(() => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmJlNDIxM2ExM2FiODg2NTI0NmYzZCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2NjgwNjYyMjAsImV4cCI6MTY2ODEwOTQyMH0.oQO1HjS7x0zJzozZMKU7GkE5WIz5LW9FnAVyNuBoxT0';
    const id = '636be4213a13ab8865246f3d';
    const board = {
      title: '1111',
      owner: 'string',
      users: ['string'],
    };
    BoardApi.getAllBoards(token);
  }, []);
  return <div>Backend Test</div>;
};
