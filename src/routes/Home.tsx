import { chats } from '../db';
import Chat from '../components/Chat';
import Header from '../components/Header';

const Home = () => {
  return (
    <main className='m-6'>
      <Header />
      {chats.map((chat) => (
        <Chat key={chat.id} chat={chat} />
      ))}
    </main>
  )
};

export default Home;