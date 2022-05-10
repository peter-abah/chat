import React from 'react';
import useSwr from 'swr';

import { getUsers } from '@/firebase/users';
import { serializeError } from '@/lib/utils';
import User from '@/components/User';
import Loader from '@/components/Loader';
import {MdArrowForward} from 'react-icons/md';

interface Props {
  participants: {[index: string]: boolean};
  header?: React.ReactNode;
  onSelectUser: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onNext: () => void;
  shouldExclude?: (uid: string) => boolean;
};

const SelectUsers = (props: Props) => {
  const {
    participants,
    header,
    onSelectUser,
    onNext,
    shouldExclude = () => false,
  } = props;

  let { data: users, error } = useSwr('users', () => getUsers());
  
  if (error) return <p>{serializeError(error)}</p>
  if (!users) return <Loader />

  users = users.filter(({uid}) => !shouldExclude(uid));
  
  return (
   <section>
     {header}
     <div className='px-8'>
       {users.map((user) => (
         <User
            key={user.uid}
            user={user}
            isSelected={participants.hasOwnProperty(user.uid)}
            onClick={onSelectUser}
          />
       ))}
     </div>
     <button
        onClick={onNext}
        className='fixed bg-primary text-white bottom-6 right-6 rounded-full p-3'
      >
        <MdArrowForward className='text-3xl md:text-4xl' />
      </button>
   </section>
  )
};

export default SelectUsers;