import { Chat as ChatType } from '@/types';
import { getChatInfo } from '@/lib/chats';

import { Link } from 'react-router-dom';
import ChatImage from './ChatImage';
import LastMessage from './LastMessage';

const Chat = ({ chat }: { chat: ChatType }) => {
  const { name } = getChatInfo(chat);

  return (
    <Link to={`/chat/${chat.id}`} className='flex py-3 by'>
      <ChatImage className='mr-3' chat={chat} />
      <div className='grow'>
        <h2 className='font-bold'>{name}</h2>
        <LastMessage message={chat.lastMessage} type={chat.type} />
      </div>
    </Link>
  )
};

export default Chat;