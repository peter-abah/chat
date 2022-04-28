import { MdSearch } from 'react-icons/md';

const Header = () => {
  return (
    <header className='sticky top-0 left-0 z-10 flex p-4'>
      <h1 className='mr-auto text-xl font-bold'>Chat</h1>
      
      <button type='button'>
        <MdSearch className='text-2xl' />
      </button>
    </header>
  )
};

export default Header;