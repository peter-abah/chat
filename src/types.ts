export type Index = number | string;

export interface User {
  id: Index;
  name: string;
  picture?: string | null;
};

export interface Message {
  id: Index;
  body: string;
  userName: string;
  userId: Index;
}

interface BaseChat {
  id: Index;
  type: 'private' | 'group';
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