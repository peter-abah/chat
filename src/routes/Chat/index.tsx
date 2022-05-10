import { useParams } from 'react-router-dom';
import useSwr from 'swr';
import { getChat } from '@/firebase/chats';
import { serializeError } from '@/lib/utils';
import { NotFoundError } from '@/lib/errors';

import Header from './Header';
import Messages from './Messages';
import MessageForm from './MessageForm';
import Loader from '@/components/Loader';
import ErrorPage from '@/components/ErrorPage';

const Chat = () => {
  const { id } = useParams() as { id: string };
  const { data: chat, error } = useSwr(id, getChat);
  
  if (error) {
    const message = error instanceof NotFoundError ? 'Chat not found' : undefined;
    return <ErrorPage message={message} />
  }

  if (!chat) return <Loader />

  return (
    <main className='flex flex-col h-screen'>
      <Header chat={chat} />
      <Messages chat={chat} />
      <MessageForm chat={chat} />
    </main>
  );
};

export default Chat;