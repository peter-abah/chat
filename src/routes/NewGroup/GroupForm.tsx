import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAsync from '@/hooks/useAsync';

import { createGroupChat } from '@/firebase/chats';
import  { serializeError } from '@/lib/utils';

import Header from './Header';
import ProfileImage from '@/components/ProfileImage';
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
  const [image, setImage] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  const { register, handleSubmit, getValues, formState } = useForm<FormData>();
  const { isSubmitting, errors } = formState;
  
  useEffect(() => {
    if (imgUrl) {
      URL.revokeObjectURL(imgUrl)
    }
    const url = image ? URL.createObjectURL(image) : null;
    setImgUrl(url);
  }, [image]);

  const onSubmit = async ({name}: FormData) => {
    try {
      await createGroup({name, participants, picture: image});
      navigate('/');
    } catch (e) {
      window.alert(serializeError(e));
    }
  };
  
  const onImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.currentTarget.files?.[0];
    if (img) setImage(img);
  };

  if (loading) return <Loader />

  return (
    <section>
      <Header subheading='Name group' />
      
      <form className='px-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4 flex flex-col items-center'>
          <ProfileImage
            className='!w-32 !h-32'
            imgUrl={imgUrl}
            name={getValues('name') || ''}
          />
          <input
            className='hidden fixed top-[9999px] z-[-1]'
            id='group-image'
            type='file'
            accept=".jpg,.png,.gif,.jpeg"
            onChange={onImgChange}
          />
          <div className='mt-2 flex w-fit'>
            <label 
              htmlFor='group-image'
              className='px-4 py-1 text-sm rounded-md text-white bg-primary mr-4'
            >Select Image</label>
            <button
              type='button'
              className='px-4 py-1 text-sm rounded-md text-white bg-zinc-600'
              onClick={() => setImage(null)}
            >Remove</button>
          </div>
        </div>
 
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