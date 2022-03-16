import useLocalStorage from '../hooks/useLocalStorage';

function CustomHookExample2() {
  const [task, setTask] = useLocalStorage('task', '');
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(e.target.value);
    console.log(task);

    if (!task) return;

    const taskObj = {
      task,
      completed: false,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    setTasks([...tasks, taskObj]);
    setTask('');
  };

  return (
    <>
      <form onSubmit={onSubmit} className='w-50'>
        <div className='mb-3'>
          <label className='form-label'>Task</label>
          <input
            autoFocus
            className='form-control'
            type='text'
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>

      <hr />

      {tasks.map((task) => (
        <h3 key={task.time}>{task.task}</h3>
      ))}
    </>
  );
}

export default CustomHookExample2;

/*
I can't clearly understand why Brad check "value" whether it's a function or not although 
he explained about it already in Custom Hook - useLocalStorage

Hi Z.

Brad was wanting to mimic the setState function you get back from useState.
You can pass a function to your setState that gets called for you - a callback,
that function is used to calculate the next value of state and is passed the current value of state as an 
argument.

So if you have

const [state, setState] = useState(10)

Then you can do

setState((currentState) => currentState + 10)

So here we are passing a function that will get called in the calculation of the new state.

Brad wanted you to be able to do that with the custom hook too, so that it mimics the default behavior of 
the useState hook.

Hope that answers it for you.
*/
