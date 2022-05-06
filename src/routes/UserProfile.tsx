import useSwr from 'swr';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext'

import { getUser } from '@/firebase/users';
import { deleteChat, createChat } from '@/firebase/chats';

import { getChatId } from '@/lib/chats';
import { serializeError } from '@/lib/utils';
import { PrivateChat } from '@/types';

import { MdEdit, MdDelete, MdChat } from 'react-icons/md';
import BackBtn from '@/components/BackBtn';
import Loader from '@/components/Loader';
import ProfileImage from '@/components/ProfileImage';

const UserProfile = () => {
  const navigate = useNavigate();
  const { currentUser, chats } = useAppContext();
  const { user_id } = useParams() as { user_id: string };
  const { data: user, error } = useSwr(user_id, getUser);
  
  if (error) {
    return (
      <p className='p-6 text-lg'>{serializeError(error)}</p>
    );
  }

  if (!user) return <Loader />;
  
  const chatId = currentUser?.uid === user_id ?
    '' :
    getChatId(user_id, currentUser?.uid || '');
  const chat = chats.find(({id}) => id === chatId) as PrivateChat | null;
  
  const startChat = async () => {
    if (!chatId || user_id === currentUser?.uid) return;
    
    if (!chat) await createChat(chatId);
    navigate(`/chats/${chatId}`, { replace: true });
  };
  
  const _deleteChat = async () => {
    if (!chat) return;

    await deleteChat(chat);
    navigate('/', { replace: true });
  };

  const { displayName, photoUrl, about } = user;
  return (
    <main>
      <BackBtn className='block ml-4 mt-4' />
      <div className='flex justify-center'>
        <ProfileImage
          className='!w-32 !h-32 !text-[4rem]'
          imgUrl={photoUrl}
          name={displayName || ''}
        />
      </div>
      
      <h1 className='font-bold text-xl px-4 text-center mt-4'>
        {displayName}
      </h1>
      
      <p className='text-center px-4 mt-2'>{about || '...'}</p>
      
      <section className='mt-8'>
        <button
          onClick={startChat}
          className='w-full flex items-center px-4 py-2 font-bold'
        >
          <MdChat className='text-4xl p-2 mr-4' />
          <span>Message</span>
        </button>

        {chat && (
          <button
            onClick={_deleteChat}
            className='w-full flex items-center px-4 py-2 font-bold text-red-600'
          >
            <MdDelete className='text-4xl p-2 mr-4' />
            <span>Delete Chat</span>
          </button>
        )}
      </section>
   
      {currentUser?.uid === user_id && (
        <Link
          to='/users/edit'
          className='fixed bg-primary text-white bottom-6 right-6 rounded-full p-3'
        >
          <MdEdit className='text-3xl' />
        </Link>
      )}
    </main>
  )
};

export default UserProfile;