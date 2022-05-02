import useSwr from 'swr';
import { Chat as ChatType } from '@/types';
import { getChatInfo } from '@/lib/chats';

import { Link } from 'react-router-dom';
import ProfileImage from '@/components/ProfileImage';
import LastMessage from './LastMessage';

const Chat = ({ chat }: { chat: ChatType }) => {
  const { data } = useSwr(chat, getChatInfo);

  return (
    <Link to={`/chats/${chat.id}`} className='flex py-3 items-center'>
      <ProfileImage
        className='mr-3'
        name={data?.name || ''}
        imgUrl={data?.photoUrl}
      />
      <div className='grow grid'>
        <h2 className='font-bold'>{data?.name}</h2>
        <LastMessage message={chat.lastMessage} type={chat.type} />
      </div>
    </Link>
  )
};

export default Chat;