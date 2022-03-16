import { useState, useEffect, useRef, useMemo } from 'react';

function UseMemoExample() {
  const [number, setNumber] = useState(1);
  const [inc, setInc] = useState(0);

  // Try spam clicking Re Render button. Notice Renders count is lagging.
  const sqrt = getSqrt(number);

  /* 
  getSqrt(number) isn't changing hence it doesn't render again.
  Notice Renders count is NOT lagging.
  Without useMemo(), input field render repeatedly. Hence lagging.
  */

  // const sqrt = useMemo(() => getSqrt(number), [number]);

  const renders = useRef(1);

  useEffect(() => {
    renders.current = renders.current + 1;
  });

  const onClick = () => {
    setInc((prevState) => {
      console.log(prevState + 1);
      return prevState + 1;
    });
  };

  return (
    <div className='col-xs-7'>
      <input
        type='number'
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className='form-control'
      />

      <h2 className='my-3'>
        The sqrt of {number} is {sqrt}
      </h2>

      <button onClick={onClick} className='btn btn-primary'>
        Re Render
      </button>
      <h3>Renders: {renders.current}</h3>
    </div>
  );
}

function getSqrt(n) {
  for (let i = 0; i <= 10000; i++) {
    console.log(i);
  }

  console.log('Expensive Function Called!');
  return Math.sqrt(n);
}

export default UseMemoExample;
