import useSwr from 'swr';
import { Link } from 'react-router-dom'
import { Chat, ChatInfo } from '@/types';
import { getChatInfo, getChatLink } from '@/lib/chats';

import { MdSearch } from 'react-icons/md';
import BackBtn from '@/components/BackBtn';
import ProfileImage from '@/components/ProfileImage';

const Header = ({ chat }: { chat: Chat }) => {
  const { data, error } = useSwr(chat, getChatInfo);
  const name = data?.name ? data.name : '';
  
  const link = getChatLink(chat);
  return (
    <header className='flex justify-between sticky top-0 bg-bg p-2'>
      <Link to={link} className='flex'>
        <BackBtn className='mr-2' />
        <ProfileImage
          className='!w-8 !h-8 mr-2'
          name={name}
          imgUrl={data?.photoUrl}
        />
        <h1 className='text-xl font-bold'>{data?.name}</h1>
      </Link>
  
      <button type='button'>
        <MdSearch className='text-2xl' />
      </button>
    </header>
  )
};

export default Header;