export interface User {
  uid: string;
  displayName: string;
  photoUrl?: string | null;
  about?: string;
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
  participants: string[];
  lastMessage?: Message;
}

export interface PrivateChat extends BaseChat {
  type: 'private';
  participants: [string, string];
}

export interface GroupChat extends BaseChat {
  type: 'group';
  name: string;
  owner: string;
  photoUrl?: string | null;
};

export interface ChatInfo {
  name: string;
  photoUrl: string;
}

export type Chat = GroupChat | PrivateChat;