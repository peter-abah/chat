import { signOutUser } from '@/firebase/auth';
import { MdLogout } from 'react-icons/md';
import Header from '@/components/Header';

const Settings = () => {
  return (
    <>
      <Header heading='Settings' />
      <section>
        <button 
          onClick={signOutUser}
          className='flex items-center px-4 py-2 text-red-600 font-bold'
        >
          <MdLogout className='text-4xl p-2 mr-4' />
          <span>Logout</span>
        </button>
      </section>
    </>
  )
};

export default Settings;