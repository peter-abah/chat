import { 
  createContext,
  useContext, 
  useState,
  useEffect,
  ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chat, User } from '@/types';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase'
import { getChats } from '@/firebase/chats';
import { getUser } from '@/firebase/users';

import Loader from '@/components/Loader';

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
  const [authLoading, setAuthLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) return;

    const unsub = getChats(setChats);
    return () => unsub();

  // using currentUser here instead of auth.currentUser since auth is
  // imported and any change in auth does not call the useEffect function again
  // and I need this hook to call again if a user signs in.
  }, [currentUser]);
  
  useEffect(() => {
    onAuthStateChanged(auth, async (user: User | null) => {
      setAuthLoading(false);
      if (user) {
        // setting it to user in firebase auth to avoid delay in signing in
        setCurrentUser(user)
        const _user = await getUser(user.uid);
        // setting it to user in firestore to access other properties and prevent 
        // sensitive user info from being stored in local storage
        setCurrentUser(_user);
      } else {
        setCurrentUser(null);
        navigate('/login');
      }
   })
  }, [setCurrentUser]);
  
  if (authLoading) return <Loader />;
  
  return (
    <AppContext.Provider value={{chats, currentUser}}>
      {children}
    </AppContext.Provider>
  )
};

export const useAppContext = () => {
  return useContext(AppContext) as AppContextInterface;
};