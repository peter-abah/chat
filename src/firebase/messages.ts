import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '.';
import { authenticate } from './auth'
import { Chat, Message } from '@/types';

export const sendMessage = async (chat: Chat, body: string) => {
  authenticate();
  
  const collectionRef = collection(db, 'chats', chat.id, 'messages');
  await addDoc(collectionRef, {
    userName: auth.currentUser!.displayName,
    userId: auth.currentUser!.uid,
    body
  });
}