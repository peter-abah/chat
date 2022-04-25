import { useParams } from 'react-router-dom'
import { useAppContext } from '@/context/AppContext';

import Header from './Header';
import Messages from './Messages';
import MessageForm from './MessageForm';

const Chat = () => {
  const { id } = useParams() as { id: string };
  const { chats } = useAppContext();
  const chat = chats.filter((c) => id == c.id)[0];

  return (
    <main className='flex flex-col min-h-screen'>
      <Header chat={chat} />
      <Messages chat={chat} />
      <MessageForm />
    </main>
  );
};

export default Chat;