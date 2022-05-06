import useSWR from 'swr';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

import { getChat, removeUserFromGroup, deleteGroup } from '@/firebase/chats';
import { serializeError } from '@/lib/utils';

import { MdExitToApp as MdExit, MdDelete } from 'react-icons/md';
import Participants from './Participants';
import BackBtn from '@/components/BackBtn';
import Loader from '@/components/Loader';
import ProfileImage from '@/components/ProfileImage';

const GroupProfile = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppContext();
  const { id } = useParams() as { id: string };
  const { data: chat, error } = useSWR(id, getChat);

  if (error) {
    return (
      <p className='p-6 text-lg'>{serializeError(error)}</p>
    );
  };

  if (!chat) return <Loader />;
  if (chat.type !== 'group' ) return null;
  
  const leaveGroup = async () => {
    const shouldLeave = window.confirm('Are you sure you want to leave?')
    if (!shouldLeave || !currentUser) return;

    try {
      await removeUserFromGroup(chat, currentUser.uid);
      navigate('/');
      toast.success('Group exited');
    } catch (e) {
      toast.error('Unable to exit group');
    }
  };
  
 const _deleteGroup = async () => {
    if (currentUser?.uid !== chat.owner) return;

    const shouldDelete = window.confirm('Are you sure you want to delete this group?')
    if (!shouldDelete) return;

    try {
      await deleteGroup(chat);
      navigate('/');
      toast.success('Group deleted');
    } catch (e) {
      toast.error('Unable to delete group')
    }
  };

  const { name, photoUrl } = chat;
  return (
    <main>
      <BackBtn className='block ml-4 mt-4' />
      <div className='flex justify-center'>
        <ProfileImage
          className='!w-32 !h-32 !text-[!text-4rem]'
          imgUrl={photoUrl}
          name={name || ''}
        />
      </div>
      
      <h1 className='text-xl font-bold px-4 text-center mt-4'>
        {name}
      </h1>
 
      <section className='mt-2 px-4 mb-8'>
        <h2 className='font-bold'>Description</h2>
        <p className='text-sm'>
          Group description which can have many letters is here
        </p>
      </section>
      
      <Participants chat={chat} />
      
      <section className='mt-8 font-bold text-red-600'>
        <button 
          onClick={leaveGroup}
          className='flex items-center px-4 py-3'
        >
          <MdExit className='text-2xl ml-2 mr-6' />
          <span>Leave Group</span>
        </button>
        
        {currentUser?.uid === chat.owner && (
          <button
            onClick={_deleteGroup}
            className='flex items-center px-4 py-3'
          >
            <MdDelete className='text-2xl ml-2 mr-6' />
            <span>Delete Group</span>
          </button>
        )}
      </section>
    </main>
  )
};

export default GroupProfile;