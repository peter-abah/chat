import { useForm } from 'react-hook-form';

import Header from '@/components/Header';
import LoadingBar from '@/components/LoadingBar';
import { deleteAccount, errorToMsg } from '@/firebase/auth';
import toast from 'react-hot-toast';
import { serializeError } from '@/lib/utils';

interface FormData {
  password: string;
}
const DeleteAccount = () => {
  let { register, handleSubmit, setError, formState } = useForm<FormData>();
  const { isSubmitting, errors } = formState;

  const onSubmit = async ({password}: FormData) => {
    try {
      await deleteAccount(password);
      toast.success('Account deleted');
    } catch (e: any) {
      const [key, message] = Object.entries(errorToMsg(e))[0];
      if (key === 'password') setError(key, message);

      toast.error('Unable to delete account')
    }
  };

  return (
    <>
      {isSubmitting && <LoadingBar overlay />}
      <Header heading='Account' subheading='Delete Account' />
      
      <section className='mt-2 px-4 mb-8'>
        <h2 className='font-bold text-lg'>
          Are you sure you want to delete your account
        </h2>
        <p> All messages and chats will also be deleted.</p>
      </section>

      <form className='px-4' onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-4">
          <label
            htmlFor='password'
            className="font-bold mb-2"
          >
            Enter Password:
          </label>
          <input
            id='password' 
            className="px-3 py-2 border rounded-md"
            type='password'
            {...register('password', { required: 'Password can not be blank'})}
          />
          {errors.password && 
            <small className="pl-2 text-sm">
              {errors.password.message}
            </small>
          }
        </div>

        <button
          className="mt-8 flex bg-red-600 text-white font-bold items-center mx-auto justify-center px-4 py-2 rounded-lg"
          type='submit'
          disabled={isSubmitting}
        >Delete</button>
      </form>
  </>
  )
};

export default DeleteAccount;