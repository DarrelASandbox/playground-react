import { useState, useEffect } from 'react';

function useFetch(url, options) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();

        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export default useFetch;

/*
Hey Will, at 5:00 in the video, Brad adds a line that disables the linter from complaining about an empty 
dependency array.

I tried following the linter's advice by adding "options" and "url" to the array.
This made sense to me (since it makes sense we'd want to re-query the API if the URL or the options changed.
However, this led to an infinite loop in my browser. So two questions for you.

1. Why was this infinite loop caused. As far as I can see, we're not changing the URL or the options object.
I suspect it has something to do with the options object (since objects are passed by reference).
Is a new version of the object getting created somewhere?

2. Is there a way to create this custom hook without disabling the linter?
It feels like this wouldn't be best practice.


Hi Albert.

Yeah you raise a good issue. Whenever I see someone ignoring the Linter it usually is a pretty good indicator
they are doing something wrong or can make significant improvements.

So to answer your questions.

1. useEffect runs after the first render and then again if any of our dependencies change.
So when we use our hook in CustomHookExample1 it runs after the render of our component.
Then our custom hook runs which triggers a re render of our component. So again we call

  const { data, loading } = useFetch(
    'https://jsonplaceholder.typicode.com/posts',
    {}
  )

This code runs again because our component just re rendered, so we are creating a new object,
it may look the same but it is not. Objects in javascript are reference types so {} and {} are
not the same they are two different objects in memory. So in our custom hook we just changed the options
object and so our useEffect runs again which in turn re renders our component which again creates a new
options object.... and so on until React freaks out.

2. So the simplest solution to 'fix' this is to understand what reference types are and create our options
and url outside the component which guarantees they don't change and stay the same as each time our component
renders and we call the hook, the options are the same reference - the same object in memory.

const url = 'https://jsonplaceholder.typicode.com/posts'
const options = {} // declare options outside of component
 
function CustomHookExample1() {
  const { data, loading } = useFetch(url, options)
 
  if (loading) {
    return <h3>Loading...</h3>
  }
 
  return (
    <div>
      {data.map((post) => (
        <h3 key={post.id}>{post.title}</h3>
      ))}
    </div>
  )
}
 
You can then safely add url and options to the dependency array.

Which will solve the issue. However I don't feel it is a good solution as if you are the creator of useFetch
you would not want other programmers to have to do this as there is little point in creating a custom hook.
You would want to abstract this away from the user of the hook to make it simple and reusable, which is kind
of the point of custom hooks.

To be honest I don't really see the point of the hook in real use, I would take it more as a brief example and would take a good deal more logic to correctly implement a 'useFetch' custom hook.
The fetch API doesn't actually throw any errors so there will be no error to catch, error will always be null. If you did have an error provided by the hook then really it should cover bad responses and give something meaningful like server messages back to the user of the hook.
The hook won't re run on options or url change and won't re fetch data.
Loading will only ever change once.

Additionally there is no clean up, so if the component un mounts before the response is received then
you will have memory leaks.

So you may as well just use fetch directly without the 'custom' hook.
Hope that answers it.

You absolutely could create a true useFetch hook but it would need considerably more logic.


Got it, thanks Will. I just want to clarify to make sure I understand why the component re-renders in the
first place. Let me know if my chain of logic is correct here:

1. We load the `customHookExample1` component
2. We call our custom `useFetch` hook which creates a new state in our component? ← unsure about this
3. Eventually, the data loads from our hook, which changes the state of our component
4. Once the state changes, the entire component re-renders (which means a new object is created in the
virtual DOM)
5. This new object calls the hook again, but passes in an entirely new "options" object
(since objects are pass by reference)
6. That means that if we have the "options" in the dependency array inside of our `useFetch` hook,
it will continue to re-render endlessly.

Is that correct? As far as I understand, components only re-render in one of three circumstances:

- A prop change
- A state change
- The object’s parent re-rendering

So this example broke my mental model a little bit. All of our state is stored in the custom hook. 
So is our `customHookExample1` component re-rendering because of a prop change, or a state change? 
How exactly is this working behind the scenes?

Hopefully my question makes sense. Thanks again for all the help!


Hi Albert.

Yeah your understanding is spot on, nice one.
I just had a play and came up with what I feel is a better solution to useFetch...

see useFetch2.js

So this doesn't require the user to do anything special with url or data, they can use it as Brad intended
but it won't trigger any linter warnings.

It has a cleanup so if the component unmounts before the data is received we have no memory leaks.
It also handles bad responses (4xx, 5xx) and provides a useful error message and server response.
Sometimes servers respond with a payload even on bad responses so you may still need more than simply
- it didn't work, and a boolean.

It should also re fetch if the url changes, but not the options/config.

Hope that helps.
*/
