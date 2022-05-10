import { Link } from 'react-router-dom';

const ErrorPage = ({message}: {message?: string}) => {
  message ||= 'An unexpected error occured';
  
  return (
    <section className='flex flex-col items-center mx-auto max-w-[35rem]'>
      <p
        className='text-2xl md:text-4xl text-center p-16'
      >{message}</p>
      <Link
        to='/'
        className='block rounded-xl w-fit text-xl md-text-3xl px-4 py-2 bg-primary text-white'
      >Back to home</Link>
    </section>
  )
};

export default ErrorPage;