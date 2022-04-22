import useCounter from '../hooks-custom-hooks/use-counter';
import Card from './Card';

const ForwardCounter = () => {
  const counter = useCounter();
  return <Card>{counter}</Card>;
};

export default ForwardCounter;
