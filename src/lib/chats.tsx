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
    return { name: chat.name, photoUrl: chat.photoUrl }
  }
  
  const user = await getChatUser(chat);
  return { 
    name: user.displayName || 'No Name',
    photoUrl: user.photoUrl 
  }
};

export const getChatId = (uid1: string, uid2: string) => {
  const comp = uid1.localeCompare(uid2);
  if (comp === 0) throw new Error('ids are the same');

  if (comp === -1) return uid1 + '_' + uid2;
  return uid2 + '_' + uid1;
}