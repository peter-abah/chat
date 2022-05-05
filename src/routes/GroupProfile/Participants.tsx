import useSwr from 'swr';
import { useNavigate } from 'react-router-dom';

import { getParticipants } from '@/firebase/users';
import { serializeError } from '@/lib/utils';
import { GroupChat } from '@/types';
import User from '@/components/User';
import Loader from '@/components/Loader';
import { MdDelete } from 'react-icons/md';

const Participants = ({chat}: {chat: GroupChat}) => {
  const { data: participants, error } = useSwr(
    `${chat.id}/participants`, () => getParticipants(chat.participants)
  );
  const navigate = useNavigate();

  if (error) {
    return (
      <p className='p-6 text-lg'>{serializeError(error)}</p>
    );
  }

  if (!participants) return <Loader />
  
  const handleUserClick = (uid: string) => {
    return () => navigate(`/users/${uid}`, {replace: true})
  };

  return (
    <section className='pr-4'>
      <h2 className='font-bold mb-2 px-4'>Participants</h2>
      {participants.map((user) => (
        <div className='flex items-center'>
          <User
            key={user.uid}
            user={user}
            onClick={handleUserClick(user.uid)}
          />
          <button>
            <MdDelete className='text-xl text-red-600' />
          </button>
        </div>
      ))}
    </section>
  )
};

export default Participants;