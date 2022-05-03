import { useParams } from 'react-router-dom'
import { useAppContext } from '@/context/AppContext';

import Header from './Header';
import Messages from './Messages';
import MessageForm from './MessageForm';
import Loader from '@/components/Loader';

const Chat = () => {
  const { id } = useParams() as { id: string };
  const { chats } = useAppContext();
  const chat = chats.filter((c) => id == c.id)[0];

  if (!chat) return (
    <p className='p-6 text-lg'>Chat not found</p>
   );

  return (
    <main className='flex flex-col h-screen'>
      <Header chat={chat} />
      <Messages chat={chat} />
      <MessageForm chat={chat} />
    </main>
  );
};

export default Chat;