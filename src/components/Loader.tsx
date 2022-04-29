import Spinner from './Spinner';

const Loader = () => {
  return (
    <div className='w-full grow p-20 grid place-items-center'>
      <Spinner loading className='!w-16 !h-16' />
    </div>
  )
};

export default Loader;