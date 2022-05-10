import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import Header from '@/components/Header';
import Spinner from '@/components/Spinner';
import { updateUserEmail, errorToMsg } from '@/firebase/auth';
import { auth } from '@/firebase';
import toast from 'react-hot-toast';
import { serializeError } from '@/lib/utils';

const formSchema = yup.object({
  email: yup.string().required('Enter new email.')
    .email('Enter valid email.'),
  password: yup.string().required('Enter password')
}).required();

type FormData = yup.InferType<typeof formSchema>

const ChangeEmail = () => {
  const navigate = useNavigate();

  let { register, handleSubmit, setError, formState } = useForm<FormData>({
    resolver: yupResolver(formSchema)
  });
  const { isSubmitting, errors } = formState;

  const onSubmit = async ({email, password}: FormData) => {
    try {
      await updateUserEmail(email, password);

      navigate(-1);
      toast.success('Email updated');
    } catch (e: any) {
      const [key, message] = Object.entries(errorToMsg(e))[0];
      if (key === 'password' || key === 'email') { 
        setError(key, message);
      }

      toast.error('Unable to change email')
    }
  };

  return (
    <>
      <Header heading='Account' subheading='Change email' />
      
      <section className='mt-2 px-4 md:px-12 mb-8'>
        <h2 className='font-bold'>Current Email</h2>
        <p className='text-sm'>
          {auth.currentUser?.email || 'No email'}
        </p>
      </section>

      <form className='px-4' onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-8">
          <label
            htmlFor='email'
            className="font-bold mb-2"
          >
            New Email:
          </label>
          <input
            id='email'
            className="px-3 py-2 border-2 border-gray-400 rounded-md"
            type='email'
            {...register('email')}
          />
          {errors.email &&
            <small className="pl-2 text-sm">
              {errors.email.message}
            </small>
          }
        </div>
  
        <div className="flex flex-col mb-8">
          <label
            htmlFor='password'
            className="font-bold mb-2"
          >
            Password:
          </label>
          <input
            id='password' 
            className="px-3 py-2 border-2 border-gray-400 rounded-md"
            type='password'
            {...register('password')}
          />
          {errors.password && 
            <small className="pl-2 text-sm">
              {errors.password.message}
            </small>
          }
        </div>

        <button
          className="mt-8 flex bg-primary text-white font-bold items-center justify-center px-4 py-2 rounded-lg"
          type='submit'
        >
          {isSubmitting ?
            <Spinner loading /> :
            <span>Save</span>
          }
        </button>
      </form>
  </>
  )
};

export default ChangeEmail;