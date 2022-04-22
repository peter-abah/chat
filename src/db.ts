import { Chat, User, Message, Index } from './types';

export const chats: Chat[] = [
  {
    id: 1,
    type: 'private',
    participants: [1, 2],
    lastMessage: { id: 2, body: 'How are you doing', userId: 2, userName: 'Homer' }
  },
  {
    id: 2,
    type: 'group',
    name: 'Sevre',
    participants: [2, 3],
    owner: 2,
    lastMessage:  { id: 2, body: 'Nice to be here', userId: 3, userName: 'Peter' }
  }
];

interface ChatMessages {
  [index: Index]: Message[];
};
export const chatMessages: ChatMessages = {
  1: [
    { id: 1, body: 'Hi', userId: 1, userName: 'John' },
    { id: 2, body: 'How are you doing', userId: 2, userName: 'Homer' }
  ],
  2: [
    { id: 1, body: 'Welcome', userId: 2, userName: 'John' },
    { id: 2, body: 'Nice to be here', userId: 3, userName: 'Peter' }
  ]
}

export const users: User[] = [
  { uid: 1, displayName: 'John' },
  { uid: 2, displayName: 'Homer' },
  { uid: 3, displayName: 'Peter' }
];

export const currentUser: User = { uid: 2, displayName: 'Homer' };
