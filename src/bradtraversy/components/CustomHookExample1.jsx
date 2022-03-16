// useFetch
import useFetch from '../hooks/useFetch';
import useFetch2 from '../hooks/useFetch2';

function CustomHookExample1() {
  const { data, loading } = useFetch2(
    'https://jsonplaceholder.typicode.com/posts',
    {}
  );

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      {data.map((post) => (
        <h3 key={post.id}>{post.title}</h3>
      ))}
    </div>
  );
}

export default CustomHookExample1;
