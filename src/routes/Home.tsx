import { chats } from '../db';
import Chat from '../components/Chat';

const Home = () => {
  return (
    <main>
      {chats.map((chat) => (
        <Chat key={chat.id} chat={chat} />
      ))}
    </main>
  )
};

export default Home;