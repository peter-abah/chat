export type Index = number | string;

export interface User {
  uid: string;
  displayName: string | null;
  picture?: string | null;
};

export interface Message {
  id: string;
  body: string;
  userName: string;
  userId: Index;
}

export type ChatType = 'private' | 'group';

interface BaseChat {
  id: string;
  type: ChatType;
  participants: Index[];
  lastMessage?: Message;
}

export interface PrivateChat extends BaseChat {
  type: 'private';
  participants: [Index, Index];
}

export interface GroupChat extends BaseChat {
  type: 'group';
  name: string;
  owner: Index;
  picture?: string | null;
};

export interface ChatInfo {
  name: string;
  picture: string;
}

export type Chat = GroupChat | PrivateChat;