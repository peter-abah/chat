import { chatsQuery } from '@/firebase/chats';
import useQuerySnapshot from '@/hooks/useQuerySnapshot';
import Chat from '@/components/Chat';
import Loader from '@/components/Loader';
import ErrorPage from '@/components/ErrorPage';
import { Chat as ChatType } from '@/types';
import { serializeError } from '@/lib/utils';

const ChatsList = () => {
  const query = chatsQuery();
  const { data: chats, loading, error } = useQuerySnapshot<ChatType>('chats', query);
  
  if (loading) return <Loader />;
  if (error) return <ErrorPage />;
  
  if (chats.length <= 0) {
    return (
      <p
        className='px-4 md:px-12 text-lg md:text-2xl text-center'
      >Not chats yets</p>
    )
  }

  return (
    <div className='px-4 md:px-12'>
      {chats.map((chat) => (
        <Chat key={chat.id} chat={chat} />
      ))}
    </div>
    )
  };
  
export default ChatsList;