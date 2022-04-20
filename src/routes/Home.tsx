import { chats } from '../db';
import Chat from '../components/Chat';

const Home = () => {
  return (
    <main className='m-6'>
      {chats.map((chat) => (
        <Chat key={chat.id} chat={chat} />
      ))}
    </main>
  )
};

export default Home;