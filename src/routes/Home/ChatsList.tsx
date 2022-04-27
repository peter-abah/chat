import { chatsQuery } from '@/firebase/chats';
import useQuerySnapshot from '@/hooks/useQuerySnapshot';
import Chat from '@/components/Chat';
import { Chat as ChatType } from '@/types';

const ChatsList = () => {
  const query = chatsQuery();
  const { data: chats, loading, error } = useQuerySnapshot<ChatType>(query);
  if (loading) {
     return <p className='p-4'>Loading...</p>
  }

  if (error) {
    return <p className='p-4'>An error occured</p>
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