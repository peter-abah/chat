import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

const BackBtn = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(-1);
  
  return (
    <button className={className} onClick={handleClick}>
     <MdArrowBack className='text-2xl' />
   </button>
  );
};

export default BackBtn;