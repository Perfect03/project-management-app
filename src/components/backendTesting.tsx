import React, { useEffect } from 'react';
import User from '../api/user';
export const BackendTestComponent = () => {
  useEffect(() => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmJlNDIxM2ExM2FiODg2NTI0NmYzZCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2NjgwMjEyNjUsImV4cCI6MTY2ODA2NDQ2NX0.dZ3FBJLY-K0wun07q3h2Xd2dmTYJ5oLTnKFsUiFacHc';
    const id = '636be4213a13ab8865246f3d';
  }, []);
  return <div>Backend Test</div>;
};
