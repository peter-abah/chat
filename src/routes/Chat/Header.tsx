import useSwr from 'swr';
import { Chat, ChatInfo } from '@/types';
import { getChatInfo } from '@/lib/chats';

import { MdSearch } from 'react-icons/md';
import BackBtn from '@/components/BackBtn';

const Header = ({ chat }: { chat: Chat }) => {
  const { data, error } = useSwr(chat, getChatInfo);

  return (
    <header className='flex justify-between p-2'>
      <div className='flex'>
        <BackBtn className='mr-3' />
        <h1 className='text-xl font-bold'>{data?.name}</h1>
      </div>
  
      <button type='button'>
        <MdSearch className='text-2xl' />
      </button>
    </header>
  )
};

export default Header;