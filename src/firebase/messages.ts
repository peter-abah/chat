import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '.';
import { authenticate } from './auth'
import { Chat, User } from '@/types';

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