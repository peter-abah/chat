import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useSwr from 'swr';
import useAsync from '@/hooks/useAsync';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

import { auth } from '@/firebase';
import { getUsers } from '@/firebase/users';
import { createChat as _createChat } from '@/firebase/chats';
import { getChatId } from '@/lib/chats';
import { serializeError } from '@/lib/utils';

import { MdGroupAdd } from 'react-icons/md';
import Header from '@/components/Header';
import User from '@/components/User';
import Loader from'@/components/Loader';
import LoadingBar from '@/components/LoadingBar';

const NewChat = () => {
  const navigate = useNavigate();
  const { chats, currentUser } = useAppContext();
  let { data: users, error } = useSwr('users', () => getUsers());

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

  if (error) return <p className='p-4'>{serializeError(error)}</p>;
  if (!users) return <Loader />
  
  // filter currentUser from users list
  users = users.filter(({uid}) => uid !== currentUser?.uid)
  
  return (
    <main>
      {loadingCreateChat && <LoadingBar overlay />}
      <Header heading='New Chat' subheading='Select user' />
      <Link 
        to='/groups/new'
        replace
        className='flex items-center px-4 py-2 font-bold'
      >
        <MdGroupAdd className='text-4xl p-2 mr-4' />
        <span>Create Group</span>
      </Link>
      {users.map((user) => (
        <User 
          key={user.uid}
          user={user}
          onClick={handleClick}
        />
      ))}
    </main>
  );
};

export default NewChat;