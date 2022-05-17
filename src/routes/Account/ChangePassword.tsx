import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import Header from '@/components/Header';
import Spinner from '@/components/Spinner';
import { updateUserPassword, errorToMsg } from '@/firebase/auth';
import toast from 'react-hot-toast';
import { serializeError } from '@/lib/utils';

const formSchema = yup.object({
  currentPassword: yup.string().required('Current password can not be blank'),
  newPassword: yup.string().required('Enter password')
    .min(8, 'Password must have at least 8 characters'),
  newPasswordConfirmation: yup.string().oneOf(
    [yup.ref('newPassword'), null],
    'Passwords must match'
  )
}).required();

type FormData = yup.InferType<typeof formSchema>

const ChangePassword = () => {
  const navigate = useNavigate();

  let { register, handleSubmit, setError, formState } = useForm<FormData>({
    resolver: yupResolver(formSchema)
  });
  const { isSubmitting, errors } = formState;

  const onSubmit = async (d: FormData) => {
    try {
      await updateUserPassword(d.currentPassword, d.newPassword);

      navigate(-1);
      toast.success('Password updated');
    } catch (e: any) {
      const [key, message] = Object.entries(errorToMsg(e))[0];
      if (key === 'password') setError('currentPassword', message);

      toast.error('Unable to change password')
    }
  };

  return (
    <>
      <Header heading='Account' subheading='Change password' />

      <form className='px-4 md:px-12' onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-4">
          <label
            htmlFor='current-password'
            className="font-bold mb-2"
          >
            Current Password:
          </label>
          <input
            id='current-password'
            className="px-3 py-2 border max-w-[20rem] border-gray-400 rounded-md"
            type='password'
            {...register('currentPassword')}
          />
          {errors.currentPassword &&
            <small className="pl-2 text-sm">
              {errors.currentPassword.message}
            </small>
          }
        </div>
  
        <div className="flex flex-col mb-4">
          <label htmlFor='new-password' className="font-bold mb-2">New Password: </label>
          <input
            id='new-password' 
            className="px-3 py-2 border max-w-[20rem] border-gray-400 rounded-md"
            type='password'
            {...register('newPassword')}
          />
          {errors.newPassword && 
            <small className="pl-2 text-sm">
              {errors.newPassword.message}
            </small>
          }
        </div>
        
        <div className="flex flex-col mb-4">
          <label htmlFor='new-password-confirmation' className="font-bold mb-2">Confirm New Password: </label>
          <input
            id='new-password-confirmation'
            className="px-3 py-2 border max-w-[20rem] border-gray-400 rounded-md"
            type='password'
            {...register('newPasswordConfirmation')} 
          />
          {errors.newPasswordConfirmation && 
            <small className="pl-2 text-sm">
              {errors.newPasswordConfirmation.message}
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

export default ChangePassword;