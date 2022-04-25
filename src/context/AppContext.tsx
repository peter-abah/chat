import { 
  createContext,
  useContext, 
  useState,
  useEffect,
  ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts'
import { Chat, User } from '@/types';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase'
import { getChats } from '@/firebase/chats';

export interface AppContextInterface {
  chats: Chat[];
  users: User[];
  isSignedIn: boolean;
}
const AppContext = createContext<AppContextInterface>({ 
  chats: [],
  users: [],
  isSignedIn: false
});

export const AppContextProvider = ({ children }: { children: ReactNode}) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isSignedIn, setIsSignedIn] = useLocalStorage('signedIn', false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) return;

    const unsub = getChats(setChats);
    return () => unsub();
  }, [isSignedIn]);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
   })
  }, [setIsSignedIn]);
  
  return (
    <AppContext.Provider value={{chats, users, isSignedIn}}>
      {children}
    </AppContext.Provider>
  )
};

export const useAppContext = () => {
  return useContext(AppContext) as AppContextInterface;
};