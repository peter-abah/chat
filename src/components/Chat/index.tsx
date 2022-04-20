import { Chat as ChatType } from '../../types';
import { getChatInfo } from './shared';

import ChatImage from './ChatImage';
import LastMessage from './LastMessage';

const Chat = ({ chat }: { chat: ChatType }) => {
  const { name } = getChatInfo(chat);

  return (
    <div className='flex my-6 by'>
      <ChatImage className='mr-3' chat={chat} />
      <div className='grow'>
        <h2 className='font-bold'>{name}</h2>
        <LastMessage message={chat.lastMessage} type={chat.type} />
      </div>
    </div>
  )
};

export default Chat;