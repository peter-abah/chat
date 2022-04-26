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
import { getUser } from '@/firebase/users';

export interface AppContextInterface {
  chats: Chat[];
  currentUser: User | null;
}
const AppContext = createContext<AppContextInterface>({ 
  chats: [],
  currentUser: null
});

export const AppContextProvider = ({ children }: { children: ReactNode}) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('currentUser', null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    const unsub = getChats(setChats);
    return () => unsub();
  }, [currentUser]);
  
  useEffect(() => {
    onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        // setting it to user in firebase auth to avoid delay in signing in
        setCurrentUser(user)
        const _user = await getUser(user.uid);
        // setting it to user in firestore to access other properties and prevent 
        // sensitive user info from being stored in local storage
        setCurrentUser(_user);
      } else {
        setCurrentUser(null);
      }
   })
  }, [setCurrentUser]);
  
  return (
    <AppContext.Provider value={{chats, currentUser}}>
      {children}
    </AppContext.Provider>
  )
};

export const useAppContext = () => {
  return useContext(AppContext) as AppContextInterface;
};