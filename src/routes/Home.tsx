import { chats } from '../db';
import Chat from '../components/Chat';
import Header from '../components/Header';

const Home = () => {
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