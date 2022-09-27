import React, { useState, useEffect } from 'react';
import Clock from './clock';
import Poke from './Poke';

const App = () => {
  const name = "React";
  const check = true;

  return (
    <div className="App">
      <h1 id="heading">Hello, {check ? name : 'NaN'}!</h1>
      <div className="clock">
        <Clock />
      </div>
      <div className='poke'>
        <Poke />
      </div>
    </div>
  );
}

export default App;
