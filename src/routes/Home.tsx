import { Link } from 'react-router-dom'
import { useAppContext } from '@/context/AppContext'
import Chat from '@/components/Chat';
import Header from '@/components/Header';

import { MdChat } from 'react-icons/md';

const Home = () => {
  const { chats } = useAppContext();
  return (
    <main>
      <Header />
      <div className='px-4'>
        {chats.map((chat) => (
          <Chat key={chat.id} chat={chat} />
        ))}
      </div>
      <Link
        to='/chats/new'
        className='fixed bg-primary text-white bottom-6 right-6 rounded-full p-3'
      >
        <MdChat className='text-3xl' />
      </Link>
    </main>
  )
};

export default Home;