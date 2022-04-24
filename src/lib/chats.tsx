import { Chat, PrivateChat } from '@/types';
import { auth } from '@/firebase';
import { getUser } from '@/firebase/users';

export const getChatUser = async (chat: PrivateChat) => {
  if (!auth.currentUser) throw new Error('User must be logged in');

  const userId = chat.participants.filter((id) => id !== auth.currentUser!.uid)[0] as string;
  const user = await getUser(userId);
  return user;
};

export const getChatInfo = async (chat: Chat) => {
  if (chat.type === 'group') {
    return { name: chat.name, picture: chat.picture }
  }
  
  const user = await getChatUser(chat);
  return { name: user.displayName || 'No Name', picture: user.picture }
};