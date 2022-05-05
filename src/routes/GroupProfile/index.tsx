import useSwr from 'swr';
import { useParams } from 'react-router-dom';
import { getChat } from '@/firebase/chats';
import { serializeError } from '@/lib/utils';

import Participants from './Participants';
import BackBtn from '@/components/BackBtn';
import Loader from '@/components/Loader';
import ProfileImage from '@/components/ProfileImage';

const GroupProfile = () => {
  const { id } = useParams() as { id: string };
  const { data: chat, error } = useSwr(id, getChat);

  if (error) {
    return (
      <p className='p-6 text-lg'>{serializeError(error)}</p>
    );
  };

  if (!chat) return <Loader />;
  if (chat.type !== 'group' ) return null;

  const { name, photoUrl } = chat;
  return (
    <main>
      <BackBtn className='block ml-4 mt-4' />
      <div className='flex justify-center'>
        <ProfileImage
          className='!w-32 !h-32'
          imgUrl={photoUrl}
          name={name || ''}
        />
      </div>
      
      <h1 className='text-xl font-bold px-4 text-center mt-4'>
        {name}
      </h1>
 
      <div className='mt-2 px-4 mb-4'>
        <h2 className='font-bold'>Description</h2>
        <p className='text-sm'>
          Group description which can have many letters is here
        </p>
      </div>
      
      <Participants chat={chat} />
    </main>
  )
};

export default GroupProfile;