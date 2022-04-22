import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { signInWithEmail, errorToMsg } from '@/firebase/users';

import Spinner from '@/components/Spinner';

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
      navigate('/');
    } catch (e: any) {
      const [key, message] = Object.entries(errorToMsg(e))[0] as [any, any];
      setError(key, message)
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
              className="flex items-center justify-center mx-auto px-4 py-2 min-w-[15rem] rounded-lg border"
              type='submit'
              disabled={isSubmitting}
            >
              <Spinner loading={isSubmitting} />
              <span className='ml-4'>Login</span>
            </button>
          </div>
        </form>
      </section>
    </main>
  )
};

export default Login;