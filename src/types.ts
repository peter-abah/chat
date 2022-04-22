export type Index = number | string;

export interface User {
  uid: Index;
  displayName: string | null;
  picture?: string | null;
};

export interface Message {
  id: Index;
  body: string;
  userName: string;
  userId: Index;
}

export type ChatType = 'private' | 'group';

interface BaseChat {
  id: Index;
  type: ChatType;
  participants: Index[];
  lastMessage: Message;
}

export interface PrivateChat extends BaseChat {
  type: 'private';
}

export interface GroupChat extends BaseChat {
  type: 'group';
  name: string;
  owner: Index;
  picture?: string | null;
};

export type Chat = GroupChat | PrivateChat;