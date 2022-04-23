import { useAppContext } from '@/context/AppContext'
import Chat from '@/components/Chat';
import Header from '@/components/Header';

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
    </main>
  )
};

export default Home;