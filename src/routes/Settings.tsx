import { useAppContext } from '@/context/AppContext';
import { signOutUser } from '@/firebase/auth';
import { MdLogout, MdDarkMode, MdLightMode } from 'react-icons/md';
import Header from '@/components/Header';

const Settings = () => {
  const { theme, toggleTheme } = useAppContext();

  const iconClass = 'text-4xl p-2 mr-4';
  const themeIcon = theme === 'dark' ?
    <MdLightMode className={iconClass} /> :
    <MdDarkMode className={iconClass} />

  return (
    <>
      <Header heading='Settings' />
      <section className='mt-4'>
        <button
          onClick={toggleTheme}
          className='w-full flex items-center px-4 py-2 font-bold'
        >
          {themeIcon}
          <span>{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
        </button>
  
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