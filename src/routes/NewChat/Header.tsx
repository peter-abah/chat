import { MdSearch } from 'react-icons/md';
import BackBtn from '@/components/BackBtn';

const Header = () => {
  return (
    <header 
      className='sticky top-0 left-0 z-20 p-4 flex items-center'
    >
      <BackBtn className='mr-4' />
      <h1 className='mr-auto text-xl font-bold'>New Chat</h1>

      <button>
        <MdSearch className='text-2xl'/>
      </button>
    </header>
  )
};

export default Header;