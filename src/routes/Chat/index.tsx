import { useParams } from 'react-router-dom';
import useSwr from 'swr';
import { getChat } from '@/firebase/chats';
import { serializeError } from '@/lib/utils';

import Header from './Header';
import Messages from './Messages';
import MessageForm from './MessageForm';
import Loader from '@/components/Loader';

const Chat = () => {
  const { id } = useParams() as { id: string };
  const { data: chat, error } = useSwr(id, getChat);
  
  if (error) return <p>{serializeError(error)}</p>
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