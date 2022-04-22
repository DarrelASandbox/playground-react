## About The Project

- React - The Complete Guide (incl Hooks, React Router, Redux)
- Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!
- Tutorial for Basic age tracker
- [Maximilian Schwarzmüller](https://github.com/maxschwarzmueller)
- [Academind](https://academind.com/)

&nbsp;

## Notes

> <b>Ahmed : </b>React immutablity
>
> I want to understand why to react is trying to make everything immutable instead of reactive. To my mind, it is expensive in terms of performance. But obviously react team would have a good reason for that, just I do not why. Please elaborate.

> <b>Jost : </b>It's much more performant for React to just check references (of objects that are considered immutable) for equality, than having to walk through deeply nested objects on each render cycle, to check if a deeply nested property may have changed.

&nbsp;

---

&nbsp;

> <b>Tony: </b>Difference between useCallback,React.memo and useMemo

> <b>MLR : </b> All three decide whether to use the previously cached content (value) or generate a new (updated) value (re-render). Using the cached version is called memoization.
>
> - [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo): Used for values.
>   - Technically, it can be used for component memoization. Prefer to use memo for functional components. useMemo invokes its wrapped function & returns the result of its wrapped function.
>   - It's second argument is a dependency array.
> - [React.memo](https://reactjs.org/docs/react-api.html#reactmemo): Used for functional component.
>   - It's second argument is a dependency (callback) function.
> - [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback): Used for functions.
>   - If memo (or useMemo) won't work, because one of its dependency functions is unnecessarily re-created (a new reference), useCallback will memoize that dependency function so memo (or useMemo) sees the same (consistent) reference.
>   - Often used to prevent an infinite loop (same reason as above).
>   - useCallback does not invoke its wrapped function & returns that wrapped function.
>   - Reminder (below): useMemo invokes its wrapped function & returns the result of its wrapped function. useCallback's second argument is a dependency array.
>
> <b>ADDITIONAL INFORMATION:</b> memo offers a dependency function. PureComponent does not. The a dependency function is very important for surgically controlling the optimization. ShouldComponentUpdate offers a way to fine tune (or target) the optimization.
>
> By returning a boolean. Unless you know how PureComponent will affect your app, PureComponent can be like: "Trying to catch a fish using dynamite".
>
> memo, PureComponent & shouldComponentUpdate:
> Tell the render method; Do your virtual DOM caching & non-caching (see image) you normally do (meaning: Run your calculations), or, use the previous (full) cache snapshot (meaning: Don't run the virtual DOM calculations, just use cache).

![react-cache](img/react-cache.png)

&nbsp;

---

&nbsp;
