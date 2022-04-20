import { Chat, PrivateChat } from '../types';
import * as db from '../db';

export const getChatUser = (chat: PrivateChat) => {
  const userId = chat.participants.filter((id) => id !== db.currentUser.id)[0];
  const user = db.users.filter(({ id }) => userId === id)[0];
  return user;
};

export const getChatInfo = (chat: Chat) => {
  if (chat.type === 'group') {
    return { name: chat.name, picture: chat.picture }
  }
  
  const user = getChatUser(chat);
  return { name: user.name, picture: user.picture }
};