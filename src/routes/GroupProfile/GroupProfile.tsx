import useSWR from 'swr';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import useAsync from '@/hooks/useAsync';
import toast from 'react-hot-toast';

import { getChat, removeUserFromGroup, deleteGroup } from '@/firebase/chats';
import { serializeError } from '@/lib/utils';
import { NotFoundError } from '@/lib/errors';

import { MdExitToApp as MdExit, MdDelete } from 'react-icons/md';
import Participants from './Participants';
import BackBtn from '@/components/BackBtn';
import Loader from '@/components/Loader';
import ProfileImage from '@/components/ProfileImage';
import LoadingBar from '@/components/LoadingBar';
import ErrorPage from '@/components/ErrorPage';

const GroupProfile = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppContext();
  const { id } = useParams() as { id: string };
  const { data: chat, error } = useSWR(id, getChat);
  
  const { func: _removeUserFromGroup, loading: loadingRemoveUser } = useAsync(removeUserFromGroup);
  const { func: _deleteGroup, loading: loadingDeleteGroup } = useAsync(deleteGroup);
  
  if (error) {
    const message = error instanceof NotFoundError ? 'Group not found' : undefined;
    return <ErrorPage message={message} />
  }

  if (!chat) return <Loader />;
  if (chat.type !== 'group' ) return null;
  
  const leaveGroup = async () => {
    const shouldLeave = window.confirm('Are you sure you want to leave?')
    if (!shouldLeave || !currentUser) return;

    try {
      await _removeUserFromGroup(chat, currentUser.uid);
      navigate('/');
      toast.success('Group exited');
    } catch (e) {
      toast.error('Unable to exit group');
    }
  };
  
 const removeGroup = async () => {
    if (currentUser?.uid !== chat.owner) return;

    const shouldDelete = window.confirm('Are you sure you want to delete this group?')
    if (!shouldDelete) return;

    try {
      await _deleteGroup(chat);
      navigate('/');
      toast.success('Group deleted');
    } catch (e) {
      toast.error('Unable to delete group')
    }
  };

  const { name, photoUrl, description } = chat;
  return (
    <main className='md:px-12 p-4'>
      {(loadingDeleteGroup || loadingRemoveUser) && <LoadingBar overlay />}

      <BackBtn className='block' />
      <div className='flex justify-center'>
        <ProfileImage
          className='!w-32 !h-32 !text-7xl !md:w-48 !md:h-48'
          imgUrl={photoUrl}
          name={name || ''}
        />
      </div>
      
      <h1 className='text-xl md:text-2xl font-bold text-center mt-4'>
        {name}
      </h1>
 
      <section className='mt-2 md:mt-4 mb-8'>
        <h2 className='font-bold md:text-lg'>Description</h2>
        <p className='text-sm md:text-base'>
          {description || '...'}
        </p>
      </section>
      
      <Participants chat={chat} />
      
      <section className='mt-8 font-bold text-red-600'>
        <button 
          onClick={leaveGroup}
          className='flex items-center px-4 py-3'
        >
          <MdExit className='text-2xl md:text-3xl ml-2 mr-6' />
          <span>Leave Group</span>
        </button>
        
        {currentUser?.uid === chat.owner && (
          <button
            onClick={removeGroup}
            className='flex items-center px-4 py-3'
          >
            <MdDelete className='text-2xl md:text-3xl ml-2 mr-6' />
            <span>Delete Group</span>
          </button>
        )}
      </section>
    </main>
  )
};

export default GroupProfile;