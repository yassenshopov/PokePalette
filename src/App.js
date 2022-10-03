import React, { useState, useEffect } from 'react';
import Poke from './Poke';
import Example from './Example.js';

const App = () => {
  return (
    <div className="App">
      <div className='poke'>
        <Poke />
      </div>
      <div id="example" className='example'>
        <Example />
      </div>
    </div>
  );
}

export default App;