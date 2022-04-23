import { db } from '.'
import { getDoc, doc } from 'firebase/firestore';

import { User } from '@/types';

const usersCache : { [index: string]: User } = {}

export const getUser = async (uid: string) => {
  if (usersCache[uid]) return usersCache[uid];
  
  const snapshot = await getDoc(doc(db, 'users', uid));
  if (snapshot.exists()) {
    const user = snapshot.data() as User;
    usersCache[uid] = user;
    return user;
  }
  
  throw new Error('User not found');
};
