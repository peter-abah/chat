import { Chat, PrivateChat } from '@/types';
import * as db from '@/db';

export const getChatUser = (chat: PrivateChat) => {
  const userId = chat.participants.filter((id) => id !== db.currentUser.uid)[0];
  const user = db.users.filter(({ uid }) => userId === uid)[0];
  return user;
};

export const getChatInfo = (chat: Chat) => {
  if (chat.type === 'group') {
    return { name: chat.name, picture: chat.picture }
  }
  
  const user = getChatUser(chat);
  return { name: user?.displayName || '', picture: user.picture }
};