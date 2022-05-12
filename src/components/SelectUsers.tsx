import React from 'react';
import useSWRInfinite from 'swr/infinite'

import { getUsers, getKey } from '@/firebase/users';
import { serializeError } from '@/lib/utils';
import { User as UserType } from '@/types';

import InfiniteScroll from 'react-infinite-scroller';
import User from '@/components/User';
import Loader from '@/components/Loader';
import Spinner from '@/components/Spinner';
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

  let { data: allUsers, error, setSize, size } = useSWRInfinite(getKey, getUsers);

  if (error) return <p>{serializeError(error)}</p>
  if (!allUsers) return <Loader />

  // merge all pages as one
  let users = allUsers.reduce((total, data) => total.concat(data));
  users = users.filter(({uid}) => !shouldExclude(uid));
  
  const hasMore = allUsers[allUsers.length - 1].length > 0;
  if (users.length <= 0) {
    return (
      <p
        className='px-4 md:px-12 text-lg md:text-2xl text-center'
      >Not users to show</p>
    )
  }
  return (
   <section>
     {header}
     <div className='md:px-12'>
       <InfiniteScroll
         pageStart={0}
         loadMore={() => setSize(size+1)}
         hasMore={hasMore}
         loader={
           <Spinner className='mx-auto my-4' key='loader' loading />
         }
       >
         {users.map((user) => (
           <User
             key={user.uid}
             user={user}
             isSelected={participants.hasOwnProperty(user.uid)}
             onClick={onSelectUser}
           />
         ))}
       </InfiniteScroll>
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