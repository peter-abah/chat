import { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import TextArea from 'react-textarea-autosize';
import toast from 'react-hot-toast';
import Spinner from '@/components/Spinner';

import useUploadFile from '@/hooks/useUploadFile';
import useAsync from '@/hooks/useAsync';
import { sendMessage } from '@/firebase/messages';
import { Chat } from '@/types';
import { useAppContext } from '@/context/AppContext'
import { serializeError } from '@/lib/utils';
import { MdSend, MdImage, MdClose, MdOutlineAttachFile as MdAttachFile } from 'react-icons/md'

type FormData = { body: string };
const MessageForm = ({ chat }: { chat: Chat }) => {
  const { register, formState, reset, handleSubmit } = useForm<FormData>();
  const { isSubmitting, errors } = formState;
  const { currentUser } = useAppContext();
  const { func: _sendMessage, loading: isSending } = useAsync(sendMessage);
  const {
    file: image,
    handleFileChange: handleImageChange,
    fileUrl: imgUrl,
    setFile: setImage
  } = useUploadFile();

  const onSubmit = async ({ body }: FormData) => {
    try {
      if (!currentUser) return;

      const data = { body, file: image };
      await _sendMessage(chat, currentUser, data);
      reset();
      setImage(null);
    } catch (e) {
      toast.error('Unable to send message');
      window.alert(serializeError(e))
    }
  };
  
  const sendFile = async (e: ChangeEvent<HTMLInputElement>) =>  {
    if (!currentUser) return;
    
    const file = e.currentTarget.files?.[0];
    if (!file) return
    
    const maxSize = 15 * 1024 * 1024 // 15mb max size
    if (file.size > maxSize) {
      toast.error(`Can not send files over 15 MB`);
      return;
    }
 
    try {
      await _sendMessage(chat, currentUser, file);
    } catch (e) {
      toast.error('Unable to send file');
      window.alert(serializeError(e))
    }
  };
 
  return (
    <section className='sticky bottom-0 z-10 px-4 md:px-12'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex items-start bg-bg py-2 md:py-6'
      >
        <div className='grow'>
          <div className='flex items-end p-2 rounded-3xl bg-msg-other'>
            <TextArea 
              className='bg-bg px-2 text-text bg-inherit focus:outline-none grow'
              maxRows={5}
              placeholder='Message'
              {...register('body', { required: 'Enter Message' })}
            />
            
            <input
              className='hidden fixed top-[9999px] z-[-1]'
              id='image'
              type='file'
              accept='image/*'
              onChange={handleImageChange}
            />
            <label 
              htmlFor='image'
              className='p-1.5 rounded-full'
            ><MdImage className='text-xl text-gray-600' /></label>
            
             
            <input
              className='hidden fixed top-[9999px] z-[-1]'
              id='file'
              type='file'
              onChange={sendFile}
            />
            <label 
              htmlFor='file'
              className='p-1.5 rounded-full'
            ><MdAttachFile className='text-xl text-gray-600' /></label>
          </div>
          
          {imgUrl && (
            <div 
              className='relative w-20 h-20 overflow-hidden rounded-md mt-2'
            >
              <img
                src={imgUrl}
                className='w-full object-cover max-h-full'
              />
              <button
                onClick={() => setImage(null)}
                className='absolute right-0 top-0 p-1 rounded-full bg-msg-other border-text'
              >
                <MdClose />
              </button>
            </div>
          )}
        </div>
        <button
          className='ml-2 px-3 py-1 bg-primary text-white rounded-xl font-bold'
          type='submit'
        >{
          isSubmitting || isSending ?
            <Spinner className='fill-white' loading /> :
            <MdSend className='text-2xl md:text-3xl'/>
          }
        </button>
      </form>
    </section>
  )
};

export default MessageForm;