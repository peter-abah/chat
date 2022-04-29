import { MdSearch } from 'react-icons/md';
import BackBtn from '@/components/BackBtn';

const Header = ({ subheading }: { subheading?: string }) => {
  return (
    <header 
      className='sticky top-0 bg-bg z-20 p-4 flex items-center'
    >
      <BackBtn className='mr-4' />
      <div className='mr-auto'>
        <h1 className='text-xl font-bold'>New Group</h1>
        <h2 className='text-lg'>{subheading}</h2>
      </div>

      <button>
        <MdSearch className='text-2xl'/>
      </button>
    </header>
  )
};

export default Header;