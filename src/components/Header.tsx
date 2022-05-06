import { MdSearch } from 'react-icons/md';
import BackBtn from './BackBtn';

interface Props {
  heading: string;
  subheading?: string;
}
const Header = ({ heading, subheading }: Props) => {
  return (
    <header 
      className='sticky top-0 bg-bg z-20 p-4 flex items-center'
    >
      <BackBtn className='mr-4' />
      <div className='mr-auto'>
        <h1 className='text-lg font-bold'>{heading}</h1>
        {subheading && <h2 className='text-sm'>{subheading}</h2>}
      </div>

      <button>
        <MdSearch className='text-2xl'/>
      </button>
    </header>
  )
};

export default Header;