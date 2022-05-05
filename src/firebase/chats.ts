import {
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  doc,
  serverTimestamp,
  arrayRemove,
  query,
  where,
  onSnapshot,
  orderBy
} from "firebase/firestore";
import { db, auth } from '.';
import { authenticate, authorize } from './auth'
import { saveFile } from './storage';
import { Chat, GroupChat } from '@/types';
import { getChatId } from '@/lib/chats';

export const getChats = (callbackFn: (chats: Chat[]) => void) => {
  authenticate();
 
  const q = query(collection(db, "chats"), 
    where("participants", "array-contains", auth.currentUser!.uid),
    orderBy('updatedAt', 'desc')
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

const chatsCache : { [index: string]: Chat } = {}

export const getChat = async (id: string) => {
  if (chatsCache[id]) return chatsCache[id];
  
  const snapshot = await getDoc(doc(db, 'chats', id));
  if (snapshot.exists()) {
    const chat ={
      ...snapshot.data(),
      id: snapshot.id
    }  as Chat;
    chatsCache[id] = chat;
    return chat;
  }
  
  throw new Error('Chat not found');
};

export const removeUserFromGroup = async (chat: GroupChat, userId: string) => {
  authenticate();
  authorize(
    chat.owner === auth.currentUser?.uid,
    'Not authorized. Must own group to edit'
  );
  authorize(userId !== auth.currentUser?.uid, 'Cannot remove self')
  
  
  await updateDoc(doc(db, 'chats', chat.id), {
    participants: arrayRemove(userId)
  });
};

export const deleteGroup = async (chat: GroupChat) => {
  authenticate();
  authorize(
    chat.owner === auth.currentUser?.uid,
    'Not authorized. Must own group to delete'
  );

  await deleteDoc(doc(db, 'chats', chat.id));
}

export const chatsQuery = () => {
  authenticate();
  return query(collection(db, "chats"), 
    where("participants", "array-contains", auth.currentUser!.uid),
    orderBy('updatedAt', 'desc')
  );
}

export const createChat = async (uid: string) => {
  authenticate();
  
  const chatId = getChatId(uid, auth.currentUser!.uid);
  const docRef = doc(db, 'chats', chatId);
  await setDoc(docRef, {
    type: 'private',
    participants: [uid, auth.currentUser!.uid],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }, { merge: true });
};

interface GroupData {
  name: string;
  picture?: File | null;
  participants: string[];
}

export const createGroupChat = async ({name, picture, participants}: GroupData) => {
  authenticate();
  const photoUrl = picture ? await saveFile(picture) : undefined;
  await addDoc(collection(db, 'chats'), {
    participants: [...participants, auth.currentUser!.uid],
    owner: auth.currentUser!.uid,
    type: 'group',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    name,
    ...(photoUrl) && { photoUrl }
  });
}