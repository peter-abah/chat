import { db, auth } from '.';
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { Chat } from '@/types';

const getChats = (callbackFn: (chats: Chat[]) => void) => {
  if (!auth.currentUser) throw new Error('User must be logged in');
 
  const q = query(collection(db, "chats"), 
    where("participants", "array-contains", auth.currentUser.uid),
    orderBy("updated_at")
  );
  onSnapshot(q, (snapshot) => {
    const result: Chat[] = [];
    snapshot.forEach((doc) => result.push(doc.data() as Chat));
    callbackFn(result);
  });
};