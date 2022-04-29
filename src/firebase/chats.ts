import {
  addDoc,
  setDoc,
  collection,
  doc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  orderBy
} from "firebase/firestore";
import { db, auth } from '.';
import { authenticate } from './auth'
import { Chat } from '@/types';
import { getChatId } from '@/lib/chats';

export const getChats = (callbackFn: (chats: Chat[]) => void) => {
  authenticate();
 
  const q = query(collection(db, "chats"), 
    where("participants", "array-contains", auth.currentUser!.uid)
  );
  const unsub = onSnapshot(q, (snapshot) => {
    const result: Chat[] = [];
    snapshot.forEach((doc) => {
      const data = {...doc.data(), id: doc.id } as Chat;
      result.push(data);
    });
    callbackFn(result);
  });
  
  return unsub;
};

export const chatsQuery = () => {
  authenticate();
  return query(collection(db, "chats"), 
    where("participants", "array-contains", auth.currentUser!.uid)
  );
}

export const createChat = async (uid: string) => {
  authenticate();
  
  const chatId = getChatId(uid, auth.currentUser!.uid);
  const docRef = doc(db, 'chats', chatId);
  await setDoc(docRef, {
    type: 'private',
    participants: [uid, auth.currentUser!.uid]
  }, { merge: true });
};

interface GroupData {
  name: string;
  picture?: string;
  participants: string[];
}

export const createGroupChat = async ({name, picture, participants}: GroupData) => {
  authenticate();

  await addDoc(collection(db, 'chats'), {
    participants: [...participants, auth.currentUser!.uid],
    owner: auth.currentUser!.uid,
    type: 'group',
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
    name,
    ...(picture) && { picture }
  });
}