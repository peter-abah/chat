import useQuerySnapshot from '@/hooks/useQuerySnapshot';
import { messagesQuery, transformData } from '@/firebase/messages'
import Message from '@/components/Message';
import { serializeError } from '@/lib/utils';
import { Chat } from '@/types';

const Messages = ({ chat }: { chat: Chat }) => {
  const query = messagesQuery(chat);
  const { data: messages, error, loading } = useQuerySnapshot(
    query, transformData
  );
  
  if (loading) return <p>Loading..</p>
  if (error) return <p>Error: {serializeError(error)}</p>

  return (
    <div className='px-4 grow'>
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
    </div>
  )
};

export default Messages;