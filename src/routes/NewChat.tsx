import useSwr from 'swr';
import { getUsers } from '@/firebase/users';
import User from '@/components/User';

const NewChat = () => {
  const { data, error } = useSwr('users', () => getUsers());
  if (error) return <p>{JSON.stringify(error)}</p>;
  
  if (!data) return <p>Loading</p>
  
  return (
    <div>
      {data.map((user) => (
        <User key={user.uid} user={user} />
      ))}
    </div>
  );
};

export default NewChat;