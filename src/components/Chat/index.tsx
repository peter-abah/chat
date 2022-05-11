import useSwr from 'swr';
import { Chat as ChatType } from '@/types';
import { getChatInfo } from '@/lib/chats';

import { Link } from 'react-router-dom';
import ProfileImage from '@/components/ProfileImage';
import LastMessage from './LastMessage';

const Chat = ({ chat }: { chat: ChatType }) => {
  const { data, error } = useSwr(
    `chatinfo/${chat.id}`, () => getChatInfo(chat)
  );

  return (
    <Link to={`/chats/${chat.id}`} className='flex py-3 items-center'>
      <ProfileImage
        className='mr-3 md:w-12 md:h-12 shrink-0'
        name={data?.name || ''}
        imgUrl={data?.photoUrl}
      />
      <div className='grid'>
        <h2 className='font-bold md:text-lg'>{data?.name}</h2>
        <LastMessage message={chat.lastMessage} type={chat.type} />
      </div>
    </Link>
  )
};

export default Chat;