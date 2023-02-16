import Poke from './Poke';
import Example from './Example.js';

export default function App() {
  return (
    <div className="App">
      <div className='poke'>
        <Poke />
      </div>
      <div className='example'>
        <Example />
      </div>
    </div>
  );
}