import {
  addDoc,
  updateDoc,
  getDocs,
  collection,
  collectionGroup,
  doc,
  serverTimestamp,
  query,
  where,
  orderBy,
  DocumentData
} from 'firebase/firestore';
import { auth, db } from '.';
import { authenticate } from './auth'
import { saveFile } from './storage';
import { Chat, User, Message } from '@/types';

interface MsgData {
  body: string;
  file?: File | null;
}
export const sendMessage = async (chat: Chat, currentUser: User, data: MsgData) => {
  authenticate();

  const { body, file } = data;
  const contentUrl = file ? await saveFile(file) : null;

  const message = {
    userName: currentUser.displayName, // displayName in auth user can be null
    userId: auth.currentUser!.uid,
    timestamp: serverTimestamp(),
    body,
    ...((contentUrl && file) && {
      attachment: {
        type: file.type.split('/')[0],
        url: contentUrl,
        name: file.name,
        size: file.size,
      }
    })
  }
  const collectionRef = collection(db, 'chats', chat.id, 'messages');
  await Promise.all([
    addDoc(collectionRef, message),
    updateDoc(doc(db, 'chats', chat.id), {
      lastMessage: message,
      updatedAt: serverTimestamp()
    })
  ]);
}

export const messagesQuery = (chat: Chat) => {
  return query(
    collection(db, 'chats', chat.id, 'messages'),
    orderBy('timestamp')
  )
};

export const getAllUserMessages = async () => {
  authenticate();
  
  const q = query(collectionGroup(db, 'messages'),
    where('userId', '==', auth.currentUser!.uid)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs;
};

export const transformData = (msgDoc: DocumentData) => {
  const docData = msgDoc.data();
  return {
    ...docData,
    id: msgDoc.id,
    timestamp: docData.timestamp.seconds
  } as Message;
};