import React from 'react';
import './loader.scss';

const Loader = () => {
  return <div className="box">
    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
  </div>;
};

export { Loader };