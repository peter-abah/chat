import {
  addDoc,
  updateDoc,
  collection,
  doc,
  serverTimestamp,
  query,
  orderBy,
  DocumentData
} from 'firebase/firestore';
import { auth, db } from '.';
import { authenticate } from './auth'
import { Chat, User, Message } from '@/types';

export const sendMessage = async (chat: Chat, currentUser: User, body: string) => {
  authenticate();
  const message = {
    userName: currentUser.displayName, // displayName in auth user can be null
    userId: auth.currentUser!.uid,
    timestamp: serverTimestamp(),
    body
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

export const transformData = (msgDoc: DocumentData) => {
  const docData = msgDoc.data();
  return {
    ...docData,
    id: msgDoc.id,
    timestamp: docData.timestamp.seconds
  } as Message;
};