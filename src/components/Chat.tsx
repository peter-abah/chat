import * as db from '../db';
import { User, Chat as ChatType } from '../types';

const getChatUser = (chat: ChatType, currentUser: User) => {
  const userId = chat.participants.filter((id) => id !== currentUser.id)[0];
  const user = db.users.filter(({ id }) => userId === id)[0];
  return user;
};

const getChatInfo = (chat: ChatType, currentUser: User) => {
  if (chat.type === 'group') {
    return { name: chat.name, picture: chat.picture }
  }
  
  const user = getChatUser(chat, currentUser);
  return { name: user.name, picture: user.picture }
};

const Chat = ({ chat }: { chat: ChatType }) => {
  const { name, picture } = getChatInfo(chat, db.currentUser);
  const { lastMessage } = chat;

  return (
    <div>
      <img src={picture || ''} alt={name} />
      <p>{name}</p>

      {chat.type === 'private' ?
        <p>{lastMessage.body}</p> :
        <p>{lastMessage.userName}: {lastMessage.body}</p>
      }
    </div>
  )
};

export default Chat;