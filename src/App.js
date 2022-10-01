import React, { useState, useEffect } from 'react';
import Poke from './Poke';

const App = () => {
  const name = "React";
  const check = true;

  return (
    <div className="App">
      <div className='poke'>
        <Poke />
      </div>
    </div>
  );
}

export default App;
