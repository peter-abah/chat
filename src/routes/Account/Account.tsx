import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { MdLock, MdMail, MdDelete } from 'react-icons/md';

const Account = () => {
  const iconClass = 'text-4xl p-2 mr-4';

  return (
    <>
      <Header heading='Account' />
      <section className='md:px-8'>
        <Link 
          to='email'
          className='w-full flex items-center px-4 py-2 font-bold'
        >
          <MdMail className={iconClass} />
          <span>Change email</span>
        </Link> 
        
        <Link 
          to='password'
          className='w-full flex items-center px-4 py-2 font-bold'
        >
          <MdLock className={iconClass} />
          <span>Change password</span>
        </Link>
        
        <Link
          to='delete'
          className='w-full flex items-center px-4 py-2 font-bold'
        >
          <MdDelete className={iconClass} />
          <span>Delete Account</span>
        </Link> 
      </section>
    </>
  )
};

export default Account;