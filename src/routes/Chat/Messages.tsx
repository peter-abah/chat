import { useEffect } from 'react';
import useQuerySnapshot from '@/hooks/useQuerySnapshot';
import useScrollToBottom from '@/hooks/useScrollToBottom';

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
  
  const [ref, executeScroll] = useScrollToBottom<HTMLDivElement>();
  useEffect(executeScroll, [messages])

  if (loading) return <Loader />
  if (error) return <p className='p-4'>{serializeError(error)}</p>

  return (
    <div ref={ref} className='px-4 grow overflow-y-auto md:px-12'>
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} chat={chat} />
      ))}
    </div>
  )
};

export default Messages;