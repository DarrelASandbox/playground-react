// import PrevState from './gopinav/PrevState';
// const App = () => PrevState();

// import UseRefExample3 from './bradtraversy/components/UseRefExample3';
// const App = () => <UseRefExample3 />;

// import UseCallbackExample from './bradtraversy/components/UseCallbackExample';
// const App = () => <UseCallbackExample />;

// import CustomHookExample2 from './bradtraversy/components/CustomHookExample2';
// const App = () => <CustomHookExample2 />;

// export default App;

/******************** bradtraversy ******************* 
UseRefExample1 - Create DOM Reference
UseRefExample2 - Get Previous State
UseRefExample3 - Memory Leak Error Fix

UseMemoExample - Expensive Function Call
UseCallbackExample - Expensive Function Call

CustomHookExample1 - useFetch
CustomHookExample2 - useLocalStorage
*****************************************************/

/***************************************************************************************/
// Child component re-evaluation

// import { useState } from 'react';
// import './maximilian_schwarzmüller/App.css';
// import DemoOutput from './maximilian_schwarzmüller/components_reevaluation/Demo/DemoOutput';
// import Button from './maximilian_schwarzmüller/components_reevaluation/UI/Button/Button';

// function App() {
//   const [showParagraph, setShowParagraph] = useState(false);

//   console.log('APP RUNNING');

//   const toggleParagraphHandler = () => {
//     setShowParagraph((prevShowParagraph) => !prevShowParagraph);
//   };

//   return (
//     <div className="app">
//       <h1>Hi there!</h1>
//       <DemoOutput show={showParagraph} />
//       <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
//     </div>
//   );
// }

// export default App;

/***************************************************************************************/
// Preventing unnecessary re-evaluations with React.memo()

// import { useState } from 'react';
// import './maximilian_schwarzmüller/App.css';
// import DemoOutput from './maximilian_schwarzmüller/components_react-memo/Demo/DemoOutput';
// import Button from './maximilian_schwarzmüller/components_react-memo/UI/Button/Button';

// function App() {
//   const [showParagraph, setShowParagraph] = useState(false);

//   console.log('APP RUNNING');

//   const toggleParagraphHandler = () => {
//     setShowParagraph((prevShowParagraph) => !prevShowParagraph);
//   };

//   return (
//     <div className="app">
//       <h1>Hi there!</h1>
//       <DemoOutput show={false} />
//       <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
//     </div>
//   );
// }

// export default App;

/***************************************************************************************/
// Preventing function re-creation with useCallback()

// import { useCallback, useState } from 'react';
// import './maximilian_schwarzmüller/App.css';
// import DemoOutput from './maximilian_schwarzmüller/components_usecallback/Demo/DemoOutput';
// import Button from './maximilian_schwarzmüller/components_usecallback/UI/Button/Button';

// function App() {
//   const [showParagraph, setShowParagraph] = useState(false);

//   console.log('APP RUNNING');

//   const toggleParagraphHandler = useCallback(() => {
//     setShowParagraph((prevShowParagraph) => !prevShowParagraph);
//   }, []);

//   return (
//     <div className="app">
//       <h1>Hi there!</h1>
//       <DemoOutput show={false} />
//       <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
//     </div>
//   );
// }

// export default App;

/***************************************************************************************/
// MLR: memo's Dependency Function - useCallback not Required

/*
Just a note (for educational purposes)... Since the Button component doesn't "change";
When memo's dependency function always returns true, (after initialization) the cached button will always be used.

In this simple situation, useCallback isn't necessary.
Keeping in mind, this lecture is; to teach useCallback.
*/

// import { memo, useState } from 'react';

// //==============================

// const myContainerStyle = {
//   maxWidth: '280px',
//   margin: '5px auto 0',
//   padding: '5px 0',
//   backgroundColor: '#ddd',
//   textAlign: 'center',
//   border: '1px solid #000',
//   fontSize: '16px',
//   fontFamily: 'Helvetica',
// };
// const mySpacerStyle = { margin: '5px 0' };
// const myButtonStyle = {
//   padding: '5px 12px',
//   backgroundColor: '#777',
//   outline: 'none',
//   borderRadius: '10px',
//   color: '#fff',
//   fontSize: '1.0rem',
// };

// //==============================

// const MyButton = memo(
//   ({ myClickHandlerProps }) => {
//     console.log('My button is created only once');
//     return (
//       <button onClick={myClickHandlerProps} style={myButtonStyle}>
//         Click
//       </button>
//     );
//   },
//   () => true
// );

// function App() {
//   const [myBoolean, setMyBoolean] = useState(false);
//   const myClickHandler = () => {
//     setMyBoolean((myPrevBoolean) => !myPrevBoolean);
//   };

//   return (
//     <div style={myContainerStyle}>
//       See the console
//       <hr style={mySpacerStyle} />
//       {myBoolean ? 'True' : 'False'}
//       <hr style={mySpacerStyle} />
//       <MyButton myClickHandlerProps={myClickHandler} />
//     </div>
//   );
// }

// export default App;

/* Alicia:
I'm a bit confused by this comment.  In the example shown by Max, the console.log( ) inside the Button component fired on every click.  Doesn't that mean the component was executed each time?  I thought the point of this lecture was to show that the dependency function was detecting a change because the toggleParagraph function was technically unequal between renders due to them being two copies with different reference locations. 

Edit: Oh, wait.  I think I see now.  In your example you coded the second argument in the memo function to be a function that always returns true.  Is this a good practice for using React.memo for components you know should never change?
*/

/* MLR:
My (above) mini-script regarding a "stand alone" button is to show  memo (without useCallback) can prevent non-required re-render (recalculations).

The Button "component" is still "re-created" every time its parent (MyApp) component re-renders, but instead of being recalculated, it's cached version is used. This Button cached version's console.log('My button'); does not display inside the console.

memo is about "recalculate or use cache". When React re-renders, it means recalculate.
But, sometimes the term re-render is loosely used. Some people think of re-render as (just) executing.

Above was written before your edit. Below: Regarding your edit:

Regarding memo's dependency function: In this situation,  returning a hard-coded true is ok.
It tells memo what you want it to do. Meaning:  Always use cache (after initialization).

React's virtual DOM does a similar (dynamic) optimization as memo.
Applying memo may be more costly than (just) letting the button recalculate (re-render).

React's virtual DOM may make my memo usage (example) redundant.
My example is for educational purposes..
*/

/***************************************************************************************/
// useCallback() and its Dependencies

// import { useCallback, useState } from 'react';
// import './maximilian_schwarzmüller/App.css';
// import DemoOutput from './maximilian_schwarzmüller/components_usecallback_dependencies/Demo/DemoOutput';
// import Button from './maximilian_schwarzmüller/components_usecallback_dependencies/UI/Button/Button';

// function App() {
//   const [showParagraph, setShowParagraph] = useState(false);
//   const [allowToggle, setAllowToggle] = useState(false);

//   console.log('APP RUNNING');

//   const toggleParagraphHandler = useCallback(() => {
//     if (allowToggle) {
//       setShowParagraph((prevShowParagraph) => !prevShowParagraph);
//     }
//   }, [allowToggle]); // To recreate new allowToggle value

//   const allowToggleHandler = () => {
//     setAllowToggle(true);
//   };

//   return (
//     <div className="app">
//       <h1>Hi there!</h1>
//       <DemoOutput show={showParagraph} />
//       <Button onClick={allowToggleHandler}>Allow Toggling</Button>
//       <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
//     </div>
//   );
// }

// export default App;

/***************************************************************************************/
// Understanding State Scheduling & Batching
/* 
MLR: When two or more useState set functions are synchronously related, they will batch. Run my mini-app (below). It does batch.

When two useState set functions are asynchronously separated, they will not batch.

Example:
...
setMyFunctionOne(...);
fetch(...).then(...).then(
  ...
  setMyFunctionTwo(...);
);
...
setMyFunctionOne() & setMyFunctionTwo() will not batch.

- - - - - - - -

My mini-app (below), is similar to above, except; it doesn't have the asynchronous fetch(). Run my (one file) React mini-app (below). Batching does occur.
*/

// import { useState } from 'react';

// //==================================

// const myContainerStyle = {
//   maxWidth: '280px',
//   margin: '5px auto 0',
//   padding: '5px 0',
//   backgroundColor: '#ddd',
//   textAlign: 'center',
//   border: '1px solid #000',
//   fontSize: '16px',
//   fontFamily: 'Helvetica',
// };
// const mySpacerStyle = { margin: '5px 0' };
// const myButtonStyle = {
//   padding: '5px 12px',
//   backgroundColor: '#777',
//   outline: 'none',
//   borderRadius: '10px',
//   color: '#fff',
//   fontSize: '1.0rem',
// };

// //==================================

// function App() {
//   const [myBoolean1, setMyBoolean1] = useState(true);
//   const [myBoolean2, setMyBoolean2] = useState(true);
//   function myOtherFunction() {
//     setMyBoolean2((myPrevBool) => !myPrevBool);
//     console.log('myOtherFunction: ');
//   }

//   function myClickHandler() {
//     setMyBoolean1((myPrevBool) => !myPrevBool);
//     myOtherFunction();
//     console.log('myClickHandler: ');
//   }

//   console.log('Render: ', myBoolean1, myBoolean2);

//   return (
//     <div style={myContainerStyle}>
//       Watch the console
//       <hr style={mySpacerStyle} />
//       <button onClick={myClickHandler} style={myButtonStyle}>
//         Click
//       </button>
//       <hr style={mySpacerStyle} />
//       <div>1: {myBoolean1 ? 'True' : 'False'}</div>
//       <div>2: {myBoolean2 ? 'True' : 'False'}</div>
//     </div>
//   );
// }

// export default App;

/***************************************************************************************/
// Understanding State Scheduling & Batching
// Jost: Here is my little stackblitz live example illustrating what MLR wrote in #3:

// import { useState } from 'react';

// function App() {
//   const [x, setX] = useState(0);
//   const [y, setY] = useState(0);

//   console.log('x:', x, ' ---  y:', y);

//   function handleClickAsync() {
//     setTimeout(() => {
//       setX((prev) => prev + 1);
//       setY((prev) => prev + 1);
//     });
//   }

//   function handleClickSync() {
//     setX((prev) => prev + 1);
//     setY((prev) => prev + 1);
//   }

//   return (
//     <>
//       <p>Please observe the different behavior in the console!</p>
//       <button onClick={handleClickSync}>
//         Call setState functions synchronously
//       </button>
//       <br />
//       <br />
//       <button onClick={handleClickAsync}>
//         Call setState functions asynchronously
//       </button>
//     </>
//   );
// }

// export default App;

/***************************************************************************************/
// Optimizing with useMemo()

// import { useCallback, useMemo, useState } from 'react';
// import './maximilian_schwarzmüller/App.css';
// import DemoList from './maximilian_schwarzmüller/components_usememo/Demo/DemoList';
// import Button from './maximilian_schwarzmüller/components_usememo/UI/Button/Button';

// function App() {
//   const [listTitle, setListTitle] = useState('My List');

//   const changeTitleHandler = useCallback(() => {
//     setListTitle('New Title');
//   }, []);

//   const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

//   return (
//     <div className="app">
//       <DemoList title={listTitle} items={listItems} />
//       <Button onClick={changeTitleHandler}>Change List Title</Button>
//     </div>
//   );
// }

// export default App;

/***************************************************************************************/
// Custom Hooks

// import React from 'react';
// import BackwardCounter from './maximilian_schwarzmüller/components-custom-hooks/BackwardCounter';
// import ForwardCounter from './maximilian_schwarzmüller/components-custom-hooks/ForwardCounter';

// function App() {
//   return (
//     <React.Fragment>
//       <ForwardCounter />
//       <BackwardCounter />
//     </React.Fragment>
//   );
// }

// export default App;

/***************************************************************************************/
import { useEffect, useState } from 'react';
import NewTask from './maximilian_schwarzmüller/components-custom-http-hook/NewTask/NewTask';
import Tasks from './maximilian_schwarzmüller/components-custom-http-hook/Tasks/Tasks';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_URI}/tasks.json`
      );

      if (!response.ok) throw new Error('Request failed!');
      const data = await response.json();
      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTasks(loadedTasks);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

  useEffect(() => fetchTasks(), []);

  const taskAddHandler = (task) =>
    setTasks((prevTasks) => prevTasks.concat(task));

  return (
    <>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </>
  );
}

export default App;

/***************************************************************************************/
