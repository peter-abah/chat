import { useEffect } from 'react';
import useQuerySnapshot from '@/hooks/useQuerySnapshot';
import useScroll from '@/hooks/useScroll';

import { messagesQuery, transformData } from '@/firebase/messages'
import Message from '@/components/Message';
import Loader from '@/components/Loader';
import { serializeError } from '@/lib/utils';
import { Chat } from '@/types';

const Messages = ({ chat }: { chat: Chat }) => {
  const query = messagesQuery(chat);
  const { data: messages, error, loading } = useQuerySnapshot(
    chat.id, query, transformData
  );
  
  const [ref, executeScroll] = useScroll<HTMLDivElement>();
  useEffect(executeScroll, [messages])
  
  if (loading) return <Loader />
  if (error) return <p className='p-4'>{serializeError(error)}</p>

  return (
    <div className='px-4 grow'>
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
      <div ref={ref} />
    </div>
  )
};

export default Messages;