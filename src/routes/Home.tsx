import { useAppContext } from '@/context/AppContext'
import Chat from '@/components/Chat';
import Header from '@/components/Header';

import { BiMessageSquareAdd as AddChatIcon } from 'react-icons/bi';

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
      <button 
        className='fixed bottom-6 right-6 rounded-full p-3 border'
        onClick={() => null}
      >
        <AddChatIcon className='text-3xl' />
      </button>
    </main>
  )
};

export default Home;