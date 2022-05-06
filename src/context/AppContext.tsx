import { 
  createContext,
  useContext, 
  useState,
  useEffect,
  ReactNode } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useNavigate } from 'react-router-dom';
import { Chat, User } from '@/types';

import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/firebase'
import { getChats } from '@/firebase/chats';
import { getUser } from '@/firebase/users';

import Loader from '@/components/Loader';

export interface AppContextInterface {
  chats: Chat[];
  currentUser: User | null;
  theme: 'light' | 'dark',
  toggleTheme: () => void;
  refetchUser: () => void;
}
const AppContext = createContext<AppContextInterface | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode}) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [authLoading, setAuthLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light')
  const navigate = useNavigate();
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };
  
  const refetchUser = async () => {
    if (!currentUser) return;
    
    const user = await getUser(currentUser.uid);
    setCurrentUser(user);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme]);

  useEffect(() => {
    if (!auth.currentUser) return;
   
    const unsub = getChats(setChats);
    return () => unsub();

  // using currentUser here instead of auth.currentUser since auth is
  // imported and any change in auth does not call the useEffect function again
  // and I need this hook to call again if a user signs in.
  }, [currentUser]);
  
  useEffect(() => {
    onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
      setAuthLoading(false);
      if (user) {
        const _user = await getUser(user.uid);
        setCurrentUser(_user);
      } else {
        setCurrentUser(null);
        navigate('/login');
      }
   })
  }, [setCurrentUser]);
  
  if (authLoading) return <Loader />;
  
  const values = {chats, currentUser, refetchUser, theme, toggleTheme} 
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
};

export const useAppContext = () => {
  return useContext(AppContext) as AppContextInterface;
};