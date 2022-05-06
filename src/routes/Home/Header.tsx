import { useNavigate } from 'react-router-dom';
import { signOutUser } from '@/firebase/auth';
import OptionsMenu from '@/components/OptionsMenu';
import { MdSearch } from 'react-icons/md';

const Header = () => {
  const navigate = useNavigate();
  const options: [string, () => void][] = [
    ['Log out', signOutUser],
    ['Create group', () => navigate('/groups/new')],
    ['Settings', () => navigate('/settings')]
  ];
  return (
    <header className='sticky top-0 left-0 bg-bg z-10 flex p-4'>
      <h1 className='mr-auto text-xl font-bold'>Chat</h1>
      
      <button type='button' className='mr-4'>
        <MdSearch className='text-2xl' />
      </button>
      <OptionsMenu items={options} />
    </header>
  )
};

export default Header;