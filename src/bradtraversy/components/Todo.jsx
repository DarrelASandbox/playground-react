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

export default Todo;
