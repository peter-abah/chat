import Spinner from './Spinner';

const Loader = () => {
  return (
    <div className='w-full grow p-20 min-h-[20rem] grid place-items-center'>
      <Spinner loading className='!w-12 !h-12' />
    </div>
  )
};

export default Loader;