import { useState, useEffect, useRef } from 'react';

// /*
function Todo() {
  const [loading, setLoading] = useState(true);
  const [todo, setTodo] = useState({});

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setTodo(data);
          setLoading(false);
        }, 3000);
      });
  }, []);

  return loading ? <h3>Loading...</h3> : <h1>{todo.title}</h1>;
}

/*
Warning: Can't perform a React state update on an unmounted component.
This is a no-op, but it indicates a memory leak in your application.
To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
at Todo (http://localhost:3000/static/js/bundle.js:104:80)
*/

// The memory leak comes from trying to update the state of a component that is not in the DOM.

// */

/* Memory Leak Error Fix
function Todo() {
  const [loading, setLoading] = useState(true);
  const [todo, setTodo] = useState({});

  const isMounted = useRef(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          if (isMounted.current) {
            setTodo(data);
            setLoading(false);
          }
        }, 3000);
      });

    // Runs when component is unmounted
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return loading ? <h3>Loading...</h3> : <h1>{todo.title}</h1>;
}
*/

/*
Brad uses a isMounted ref to keep track of if the component is in the DOM or not,
if it is then it is safe to try and update state, if it is not then we don't update state - no memory leak.

It is a tricky one though and I wouldn't say using a ref here is always the approach you should take.
Many asynchronous API's you use (like Fetch or Firebase) will provide ways to correctly cleanup and cancel
some asynchronous action you started.

For example in this useRef example we won't get a memory leak from updating state but we still potentially
have a memory leak in that our setTimeout is still running and our fetch request may still be waiting for a
response. So we do still have memory leaks, you just don't get a nice warning about them.
*/

export default Todo;
