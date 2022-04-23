import { MdAdd } from 'react-icons/md';

interface Props {
  onClick: () => void;
  className?: string;
}
const AddBtn = ({ onClick, className }: Props) => {
  return (
    <button 
      className={className + ' rounded-full p-4 border'}
      onClick={onClick}
    >
      <MdAdd className='text-2xl' />
    </button>
  );
};

export default AddBtn;