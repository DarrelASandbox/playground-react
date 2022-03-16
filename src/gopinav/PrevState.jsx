import { useState } from 'react';
import PrevStateClass from './PrevStateClass';

const PrevState = () => {
  const initialCount = 0;
  const [count, setCount] = useState(initialCount);

  // Because setCount function is asynchronous and react batches multiple
  // setCount functions together so that it can render UI efficiently.
  // const incrementFive = () => {
  //   for (let i = 0; i < 5; i++) setCount(count + 1);
  // };

  // If you need to update any state value base on previous state value,
  // always pass a function that set the new state value with the previous state value.
  const incrementFive = () => {
    for (let i = 0; i < 5; i++) setCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <div>
        <h1>Functional: {count}</h1>
        <button onClick={() => setCount(initialCount)}>Reset</button>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>

        <button onClick={() => setCount((PrevState) => PrevState + 1)}>
          +1
        </button>
        <button onClick={incrementFive}>+5</button>
      </div>

      <h1>Class:</h1>
      <PrevStateClass />
    </>
  );
};
export default PrevState;
