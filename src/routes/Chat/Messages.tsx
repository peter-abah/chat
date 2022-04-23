import { Chat } from '@/types';
import Message from '@/components/Message';

const Messages = ({ chat }: { chat: Chat }) => {
  const messages: any[] = [];

  return (
    <div className='px-4'>
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
    </div>
  )
};

export default Messages;