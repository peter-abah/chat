import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useSWRInfinite from 'swr/infinite'
import useAsync from '@/hooks/useAsync';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

import { auth } from '@/firebase';
import { getUsers, getKey } from '@/firebase/users';
import { createChat as _createChat } from '@/firebase/chats';
import { getChatId } from '@/lib/chats';
import { serializeError } from '@/lib/utils';

import InfiniteScroll from 'react-infinite-scroller';
import { MdGroupAdd } from 'react-icons/md';
import Header from '@/components/Header';
import User from '@/components/User';
import ErrorPage from '@/components/ErrorPage';
import Loader from'@/components/Loader';
import Spinner from '@/components/Spinner';
import LoadingBar from '@/components/LoadingBar';

const NewChat = () => {
  const navigate = useNavigate();
  const { chats, currentUser } = useAppContext();
  let { data: allUsers, error, setSize, size } = useSWRInfinite(getKey, getUsers);

  const { func: createChat, loading: loadingCreateChat } = useAsync(_createChat);
  
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (!auth.currentUser) return;

      const { uid } = e.currentTarget.dataset as { uid: string };
      const chatId = getChatId(uid, auth.currentUser!.uid);
      const chat = chats.find((chat) => chat.id === chatId);
      
      if (chat) {
        navigate(`/chats/${chatId}`, {replace: true})
        return;
      }
      await createChat(uid);
      navigate(`/chats/${chatId}`, {replace: true});
    } catch (e) {
      toast.error('An error occured')
    }
  };

  if (error) return <ErrorPage />;
  if (!allUsers) return <Loader />;
  
  let users = allUsers.reduce((total, data) => total.concat(data));
  // filter currentUser from users list
  users = users.filter(({uid}) => uid !== currentUser?.uid)
  const hasMore = allUsers[allUsers.length - 1].length > 0;

  return (
    <main>
      {loadingCreateChat && <LoadingBar overlay />}
      <Header heading='New Chat' subheading='Select user' />
      <div className='md:px-8'>
        <Link 
          to='/groups/new'
          className='flex items-center px-4 py-2 font-bold'
        >
          <MdGroupAdd className='text-4xl p-2 mr-4' />
          <span>Create Group</span>
        </Link>
  
        {users.length > 0 && (
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
                 onClick={handleClick}
               />
             ))}
           </InfiniteScroll>
        )}
        
        {users.length <= 0 && (
          <p
            className='px-4 md:px-12 text-lg md:text-2xl text-center'
          >Not users to show</p>
        )}
      </div>
    </main>
  );
};

export default NewChat;