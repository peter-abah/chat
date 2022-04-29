import React from 'react';
import useSwr from 'swr';
import { useAppContext } from '@/context/AppContext';
import { getUsers } from '@/firebase/users';
import { serializeError } from '@/lib/utils';
import User from '@/components/User';
import Loader from '@/components/Loader';

interface Props {
  participants: string[];
  onSelectUser: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
const SelectUsers = ({participants, onSelectUser}: Props) => {
  const { currentUser } = useAppContext();
  let { data: users, error } = useSwr('users', () => getUsers());
  
  if (error) return <p>{serializeError(error)}</p>
  if (!users) return <Loader />
  
  users = users.filter(({uid}) => uid !== currentUser?.uid)
  
  return (
   <>
     {users.map((user) => (
       <User key={user.uid} user={user} />
     ))}
   </>
  )
};

export default SelectUsers;