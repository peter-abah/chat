import { useForm } from 'react-hook-form';
import TextArea from 'react-textarea-autosize';
import { sendMessage } from '@/firebase/messages';
import { Chat } from '@/types';
import { useAppContext } from '@/context/AppContext'
import { serializeError } from '@/lib/utils';
import { MdSend } from 'react-icons/md'

type FormData = { body: string };
const MessageForm = ({ chat }: { chat: Chat }) => {
  const { register, formState, reset, handleSubmit } = useForm<FormData>();
  const { isSubmitting, errors } = formState;
  const { currentUser } = useAppContext();

  const onSubmit = async ({ body }: FormData) => {
    try {
      if (!currentUser) return;

      await sendMessage(chat, currentUser, body);
      reset();
    } catch (e) {
      window.alert(serializeError(e));
    }
  };
 
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='sticky bottom-0 z-10 flex items-start p-2 bg-bg'
    >
      <TextArea 
        className='border px-4 py-2 grow'
        {...register('body', { required: 'Enter Message' })}
      />
      <button 
        disabled={isSubmitting || !!errors.body}
        className='ml-2 px-3 py-1 bg-primary text-white rounded-sm font-bold disabled:opacity-75'
        type='submit'
      >
        <MdSend className='text-2xl'/>
      </button>
    </form>
  )
};

export default MessageForm;