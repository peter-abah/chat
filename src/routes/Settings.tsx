import { Link } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { signOutUser } from '@/firebase/auth';
import {
  MdLogout,
  MdDarkMode,
  MdLightMode,
  MdAccountCircle,
  MdManageAccounts
} from 'react-icons/md';
import Header from '@/components/Header';

const Settings = () => {
  const { currentUser, theme, toggleTheme } = useAppContext();

  const iconClass = 'text-4xl p-2 mr-4';
  const themeIcon = theme === 'dark' ?
    <MdLightMode className={iconClass} /> :
    <MdDarkMode className={iconClass} />

  return (
    <>
      <Header heading='Settings' />
      <section>
        <button
          onClick={toggleTheme}
          className='w-full flex items-center px-4 py-2 font-bold'
        >
          {themeIcon}
          <span>{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
        </button>
        
        <Link 
          to={`/users/${currentUser?.uid}`}
          className='w-full flex items-center px-4 py-2 font-bold'
        >
          <MdAccountCircle className={iconClass} />
          <span>Profile</span>
        </Link>
        
        <Link 
          to={`/account`}
          className='w-full flex items-center px-4 py-2 font-bold'
        >
          <MdManageAccounts className={iconClass} />
          <span>Account</span>
        </Link>

        <button 
          onClick={signOutUser}
          className='w-full flex items-center px-4 py-2 text-red-600 font-bold'
        >
          <MdLogout className={iconClass} />
          <span>Logout</span>
        </button>
      </section>
    </>
  )
};

export default Settings;