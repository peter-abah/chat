import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSwr from 'swr';
import useAsync from '@/hooks/useAsync';
import { useAppContext } from '@/context/AppContext';

import { auth } from '@/firebase';
import { getUsers } from '@/firebase/users';
import { createChat as _createChat } from '@/firebase/chats';
import { getChatId } from '@/lib/chats';

import Header from './Header';
import User from '@/components/User';

const NewChat = () => {
  const navigate = useNavigate();
  const { chats, currentUser } = useAppContext();
  let { data: users, error } = useSwr('users', () => getUsers());

  const { 
    func: createChat,
    loading,
    error: chatError
  } = useAsync(_createChat);
  if (error) return <p className='p-6'>An error occured</p>;
  
  if (!users) return <p>Loading</p>
  
  // filter currentUser from users list
  users = users.filter(({uid}) => uid !== currentUser?.uid)
  
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || !auth.currentUser) return;

    const { uid } = e.currentTarget.dataset as { uid: string };
    const chatId = getChatId(uid, auth.currentUser!.uid);
    const chat = chats.find((chat) => chat.id === chatId);
    
    if (chat) {
      navigate(`/chats/${chatId}`)
      return;
    }
    await createChat(uid);
    navigate(`/chats/${chatId}`);
  }
  
  return (
    <main>
      <Header />
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