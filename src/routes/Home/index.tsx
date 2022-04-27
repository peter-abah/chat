import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import ChatsList from './ChatsList';
import { MdChat } from 'react-icons/md';

const Home = () => {
  return (
    <main>
      <Header />
      <ChatsList />
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