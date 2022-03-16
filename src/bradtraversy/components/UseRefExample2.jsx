import { useState, useEffect, useRef } from 'react';

// Get Previous State
function UseRefExample2() {
  const [name, setName] = useState('');

  const renders = useRef(1);
  const prevName = useRef('');

  useEffect(() => {
    renders.current = renders.current + 1;
    prevName.current = name;
  }, [name]);

  return (
    <div>
      <h1>Renders: {renders.current}</h1>
      <h2>NOT Prev Name State: {prevName.current}</h2>
      <p>
        It really is just previous render. Ref's are not reactive. State is
        reactive.
      </p>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='form-control mb-3'
      />
    </div>
  );
}

export default UseRefExample2;

/*
Hey, quick question regarding the useEffect hook + getting previous name:
We have a useEffect defined as below.
  useEffect(() => {
    renders.current = renders.current + 1;
    prevName.current = name;
  }, [name]);
Which means, every time the name state changes, it will run the function inside useEffect.
When it changes, we assign prevName.current = name; .
Wouldn't that assign always only the updated name - ie the new one? Thanks for your help in advance! Cheers

Yes you are completely correct.

In fact if you open your React dev tools you will see whatever the prevName ref is will be the same as what 
you have in the name state.

prevName isn't the previous state at all.
It's just that ref's are not reactive, meaning you don't see an update in the UI because the ref changed. 
So in the UI you see what the ref was on the last render, not the current render.
State is reactive, if state changes your component re renders and you have the new state in the UI.
A ref is like none reactive state, if a ref is mutated it persists across renders but doesn't trigger a 
render itself.

I'm not really sure of the point of the example to be honest as it's not previous state.
If you wanted to keep previous state in a ref then you would really need to mutate the ref before 
calling your setState.
*/
