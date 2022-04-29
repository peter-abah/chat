import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createGroupChat } from '@/firebase/chats';
import  { serializeError } from '@/lib/utils';
import Header from './Header';

interface Props {
  participants: string[];
};
interface FormData {
  name: string;
};

const GroupForm = ({participants}: Props) => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<FormData>();
  const { isSubmitting, errors } = formState;

  const onSubmit = async ({name}: FormData) => {
    try {
      await createGroupChat({name, participants});
      navigate('/');
    } catch (e) {
      window.alert(serializeError(e));
    }
  };

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