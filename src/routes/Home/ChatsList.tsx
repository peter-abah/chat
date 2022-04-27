import { chatsQuery } from '@/firebase/chats';
import useQuerySnapshot from '@/hooks/useQuerySnapshot';
import Chat from '@/components/Chat';
import Loader from '@/components/Loader';
import { Chat as ChatType } from '@/types';
import { serializeError } from '@/lib/utils';

const ChatsList = () => {
  const query = chatsQuery();
  const { data: chats, loading, error } = useQuerySnapshot<ChatType>('chats', query);
  if (loading) {
     return <Loader />
  }

  if (error) {
    return <p className='p-4'>{serializeError(error)}</p>
  }

  return (
    <div className='px-4'>
      {chats.map((chat) => (
        <Chat key={chat.id} chat={chat} />
      ))}
    </div>
    )
  };
  
export default ChatsList;