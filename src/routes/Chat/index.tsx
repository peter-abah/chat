import { useParams } from 'react-router-dom'
import { chats } from '../../db'

const Chat = () => {
  const { id } = useParams() as { id: string };
  const chat = chats.filter((c) => id === c.id)[0];

  return (
    <>
      <header>header here</header>
      <p>messages here</p>
      <p>form</p>
    </>
  );
};

export default Chat;