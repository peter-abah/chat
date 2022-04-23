import { db } from '.'
import { 
  getDoc, 
  getDocs,
  collection,
  doc,
  query,
  startAfter,
  limit,
  orderBy
} from 'firebase/firestore';

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

const usersQuery = () => {
  return query(collection(db, 'users'),
    limit(25),
    orderBy('displayName')
  );
};

const nextUsersQuery = (lastUid: string) => {
  return query(collection(db, 'users'),
    limit(25),
    startAfter(lastUid),
    orderBy('displayName')
  );
}

export const getUsers = async (lastUid?: string) => {
  const query = lastUid ? nextUsersQuery(lastUid) : usersQuery();
  const snapshot = await getDocs(query);
  const users= snapshot.docs.map((e) => e.data() as User)
  return users;
};