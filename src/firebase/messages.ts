import { addDoc, collection, serverTimestamp, query, DocumentData } from 'firebase/firestore';
import { auth, db } from '.';
import { authenticate } from './auth'
import { Chat, User, Message } from '@/types';

export const sendMessage = async (chat: Chat, currentUser: User, body: string) => {
  authenticate();
  
  const collectionRef = collection(db, 'chats', chat.id, 'messages');
  await addDoc(collectionRef, {
    userName: currentUser.displayName, // displayName in auth user can be null
    userId: auth.currentUser!.uid,
    timestamp: serverTimestamp(),
    body
  });
}

export const messagesQuery = (chat: Chat) => {
  return query(collection(db, 'chats', chat.id, 'messages'))
};

export const transformData = (msgDoc: DocumentData) => {
  const docData = msgDoc.data();
  return {
    ...docData,
    id: msgDoc.id,
    timestamp: docData.timestamp.seconds
  } as Message;
};