import { db, auth } from '.';
import {
  setDoc,
  collection,
  doc,
  query,
  where,
  onSnapshot,
  orderBy
} from "firebase/firestore";
import { Chat } from '@/types';
import { getChatId } from '@/lib/chats';

export const getChats = (callbackFn: (chats: Chat[]) => void) => {
  if (!auth.currentUser) throw new Error('User must be logged in');
 
  const q = query(collection(db, "chats"), 
    where("participants", "array-contains", auth.currentUser.uid)
  );
  const unsub = onSnapshot(q, (snapshot) => {
    const result: Chat[] = [];
    snapshot.forEach((doc) => {
      const data = {...doc.data(), id: doc.id } as Chat;
      result.push(data);
    });
    alert(JSON.stringify(result));
    callbackFn(result);
  });
  
  return unsub;
};

export const createChat = async (uid: string) => {
  if (!auth.currentUser) throw new Error('User must be logged in');
  
  const chatId = getChatId(uid, auth.currentUser!.uid);
  const docRef = doc(db, 'chats', chatId);
  await setDoc(docRef, {
    type: 'private',
    participants: [uid, auth.currentUser!.uid]
  }, { merge: true });
}