import { MdSearch } from 'react-icons/md';
import BackBtn from './BackBtn';

interface Props {
  heading: string;
  subheading?: string;
}
const Header = ({ heading, subheading }: Props) => {
  return (
    <header 
      className='sticky top-0 bg-bg z-20 p-4 flex items-center md:px-12 md:py-6'
    >
      <BackBtn className='mr-4' />
      <div className='mr-auto'>
        <h1 className='text-lg font-bold md:text-xl'>{heading}</h1>
        {subheading && <h2 className='text-sm md:text-base'>{subheading}</h2>}
      </div>

      <button>
        <MdSearch className='text-2xl md:text-3xl'/>
      </button>
    </header>
  )
};

export default Header;