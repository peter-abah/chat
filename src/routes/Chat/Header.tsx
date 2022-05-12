import useSwr from 'swr';
import { Link } from 'react-router-dom'
import { Chat, ChatInfo } from '@/types';
import { getChatInfo, getChatLink } from '@/lib/chats';

import { MdSearch } from 'react-icons/md';
import BackBtn from '@/components/BackBtn';
import ProfileImage from '@/components/ProfileImage';

const Header = ({ chat }: { chat: Chat }) => {
  const { data, error } = useSwr(
    `chatinfo/${chat.id}`, () => getChatInfo(chat)
  );
  const name = data?.name ? data.name : '';
  
  const link = getChatLink(chat);
  return (
    <header className='flex justify-between sticky top-0 bg-bg p-4 md:px-12 md:my-6'>
      <Link to={link} className='flex'>
        <BackBtn className='mr-2' />
        <ProfileImage
          className='!w-8 !h-8 !min-w-[2rem] mr-2 !md:w-12 !md:h-12'
          name={name}
          imgUrl={data?.photoUrl}
        />
        <h1 className='text-xl md:text-2xl font-bold'>{data?.name}</h1>
      </Link>
  
      <button type='button'>
        <MdSearch className='text-2xl md:text-3xl' />
      </button>
    </header>
  )
};

export default Header;