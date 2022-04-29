export type Index = number | string;

export interface User {
  uid: string;
  displayName: string | null;
  photoUrl?: string | null;
};

export interface Message {
  id: string;
  body: string;
  userName: string;
  userId: string;
  timestamp: number;
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
  photoUrl?: string | null;
};

export interface ChatInfo {
  name: string;
  photoUrl: string;
}

export type Chat = GroupChat | PrivateChat;