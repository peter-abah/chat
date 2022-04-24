import useSwr from 'swr';
import { getUsers } from '@/firebase/users';

const NewChat = () => {
  const { data, error } = useSwr('users', () => getUsers());
  if (error) return <p>{JSON.stringify(error)}</p>;
  
  if (!data) return <p>Loading</p>
  
  return (
    <div>
      {data.map((user) => <p>{JSON.stringify(user)}</p>)}
    </div>
  );
};

export default NewChat;