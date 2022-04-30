// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAsync from '@/hooks/useAsync';

import { createGroupChat } from '@/firebase/chats';
import  { serializeError } from '@/lib/utils';

import Header from './Header';
import Loader from '@/components/Loader';

interface Props {
  participants: string[];
};
interface FormData {
  name: string;
};

const GroupForm = ({participants}: Props) => {
  const navigate = useNavigate();
  const { loading, func: createGroup } = useAsync(createGroupChat);
  // const [image, setImage] = useState(null);

  const { register, handleSubmit, formState } = useForm<FormData>();
  const { isSubmitting, errors } = formState;

  const onSubmit = async ({name}: FormData) => {
    try {
      await createGroup({name, participants});
      navigate('/');
    } catch (e) {
      window.alert(serializeError(e));
    }
  };
  
  if (loading) return <Loader />

  return (
    <section>
      <Header subheading='Name group' />
      
      <form className='px-4' onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label className="font-bold">Group Name</label>
          <input 
            className="px-3 py-2 border rounded-md"
            type='text'
            {...register('name', { required: 'Name cannot be empty' })}
          />
          {errors.name && <small className="pl-2 text-sm">{errors.name.message}</small>}
        </div>
        
        <button
          className="flex items-center justify-center mt-8 px-4 py-2 min-w-[10rem] rounded-lg bg-primary disabled:opacity-50 text-white"
          type='submit'
          disabled={isSubmitting}
        >Save</button>
      </form>
    </section>
  )
};
export default GroupForm;