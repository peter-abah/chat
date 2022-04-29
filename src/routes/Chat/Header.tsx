import useSwr from 'swr';
import { Chat, ChatInfo } from '@/types';
import { getChatInfo } from '@/lib/chats';

import { MdSearch } from 'react-icons/md';
import BackBtn from '@/components/BackBtn';
import ProfileImage from '@/components/ProfileImage';

const Header = ({ chat }: { chat: Chat }) => {
  const { data, error } = useSwr(chat, getChatInfo);
  const name = data?.name ? data.name : '';

  return (
    <header className='flex justify-between sticky top-0 bg-bg p-2'>
      <div className='flex'>
        <BackBtn className='mr-2' />
        <ProfileImage
          className='!w-8 !h-8 mr-2'
          name={name}
          imgUrl={data?.photoUrl}
        />
        <h1 className='text-xl font-bold'>{data?.name}</h1>
      </div>
  
      <button type='button'>
        <MdSearch className='text-2xl' />
      </button>
    </header>
  )
};

export default Header;