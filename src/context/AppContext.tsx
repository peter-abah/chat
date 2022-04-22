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
  currentUser: User | null;
}
const AppContext = createContext<AppContextInterface>({ 
  chats: [],
  users: [],
  currentUser: null
});

export const AppContextProvider = ({ children }: { children: ReactNode}) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('currentUser', null);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) return;
 
    const unsub = getChats(setChats);
    return () => unsub();
  }, [auth.currentUser]);
  
  useEffect(() => {
    if (!currentUser) navigate('/login')
  }, [currentUser]);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
   })
  });
  
  return (
    <AppContext.Provider value={{chats, users, currentUser}}>
      {children}
    </AppContext.Provider>
  )
};

export const useAppContext = () => {
  return useContext(AppContext) as AppContextInterface;
};