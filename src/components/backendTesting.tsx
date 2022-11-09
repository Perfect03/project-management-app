import Authorization from 'api/authorization';
import React, { useEffect } from 'react';

export const BackendTestComponent = () => {
  useEffect(() => {
    const user = {
      name: 'saloedssss',
      login: 'salo',
      password: 'est',
    };
    Authorization.SignIn(user);
  }, []);

  return <div>Backend Test</div>;
};
