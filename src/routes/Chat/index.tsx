import { useParams } from 'react-router-dom'
import { chats } from '../../db'

import Header from './Header';
import Messages from './Messages';

const Chat = () => {
  const { id } = useParams() as { id: string };
  const chat = chats.filter((c) => id == c.id)[0];

  return (
    <>
      <Header chat={chat} />
      <Messages chat={chat} />
      <p>form</p>
    </>
  );
};

export default Chat;