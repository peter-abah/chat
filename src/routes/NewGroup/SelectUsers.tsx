import React from 'react';
import useSwr from 'swr';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { getUsers } from '@/firebase/users';
import { serializeError } from '@/lib/utils';
import Header from '@/components/Header';
import User from '@/components/User';
import Loader from '@/components/Loader';
import {MdArrowForward} from 'react-icons/md';

interface Props {
  participants: {[index: string]: boolean};
  onSelectUser: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
const SelectUsers = ({participants, onSelectUser}: Props) => {
  const { currentUser } = useAppContext();
  let { data: users, error } = useSwr('users', () => getUsers());
  
  if (error) return <p>{serializeError(error)}</p>
  if (!users) return <Loader />
  
  users = users.filter(({uid}) => uid !== currentUser?.uid)
  
  return (
   <section>
     <Header heading='Create group' subheading='Add participants' />
     {users.map((user) => (
       <User
          key={user.uid}
          user={user}
          isSelected={participants.hasOwnProperty(user.uid)}
          onClick={onSelectUser}
        />
     ))}
     <Link
        to='form'
        className='fixed bg-primary text-white bottom-6 right-6 rounded-full p-3'
      >
        <MdArrowForward className='text-3xl' />
      </Link>
   </section>
  )
};

export default SelectUsers;