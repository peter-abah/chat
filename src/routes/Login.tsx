import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { signInWithEmail, signInWithProvider, ProviderName, errorToMsg } from '@/firebase/auth';
import { serializeError } from '@/lib/utils';
import Spinner from '@/components/Spinner';

import { ReactComponent as GoogleIcon } from '@/assets/google-icon.svg';
interface FormData {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  let { register, handleSubmit, setError, formState } = useForm<FormData>();
  const { errors, isSubmitting } = formState;

  const onSubmit = async ({email, password}: FormData) => {
    try {
      await signInWithEmail(email, password);
      navigate('/', { replace: true });
    } catch (e: any) {
      const [key, message] = Object.entries(errorToMsg(e))[0] as [any, any];
      setError(key, message)
    }
  };
  
  const _signInWithProvider = async (name: ProviderName) => {
    try {
      await signInWithProvider(name);
      navigate('/', { replace: true });
    } catch (e) {
      toast.error('Unable to login');
    }
  };

  return (
    <main>
      <h1 className="mx-4 my-6 text-2xl">Chat</h1>
      <section className="p-4">
        <h2 className="mb-3 text-lg">Sign in to Chat</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-4">
            <label className="font-bold">Email: </label>
            <input 
              className="px-3 py-2 border rounded-md"
              type='email'
              {...register('email', { required: 'Email cannot be empty' })}
            />
            {errors.email && <small className="pl-2 text-sm">{errors.email.message}</small>}
          </div>
          
          <div className="flex flex-col">
            <label className="font-bold">Password: </label>
            <input
              className="px-3 py-2 border rounded-md"
              type='password'
              {...register('password', { required: 'Enter your password.' })} 
            />
            {errors.password && <small className="pl-2 text-sm">{errors.password.message}</small>}
          </div>
          
          {/** ignoring typescript error since unknown property is not present at during type checking  **/}
          {/* @ts-ignore */}
          {errors.unknown && <small className='text-sm mt-3'>{errors.unknown.message}</small>}
          
          <div className="mt-8">
            <button
              className="flex items-center justify-center mx-auto px-4 py-2 min-w-[15rem] rounded-lg bg-primary text-white"
              type='submit'
              disabled={isSubmitting}
            >
              <Spinner loading={isSubmitting} className='!fill-white mr-4' />
              <span className='font-bold'>Login</span>
            </button>
          </div>
        </form>
        <div className="relative my-4 w-full px-4" >
          <span className="z-10 block mx-auto p-2 bg-bg w-fit">OR</span>
        </div>
        <div>
          <button
            className="flex items-center mx-auto px-4 py-2 min-w-[15rem] rounded-lg border"
            type='button'
            onClick={() => _signInWithProvider('google')}
          >
            <GoogleIcon className='w-8 h-8' />
            <span className='grow text-center px-4'>Sign in with Google</span>
          </button>
        </div>
 
        <p className='mt-8 text-sm text-center'>
          <span>Don't have an account? </span>
          <Link to='/signup' className='underline text-primary'>Sign up</Link>
        </p>
      </section>
    </main>
  )
};

export default Login;