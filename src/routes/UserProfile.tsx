import useSwr from 'swr';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext'
import { getUser } from '@/firebase/users';
import { serializeError } from '@/lib/utils';

import { MdEdit } from 'react-icons/md';
import BackBtn from '@/components/BackBtn';
import Loader from '@/components/Loader';
import ProfileImage from '@/components/ProfileImage';

const UserProfile = () => {
  const { currentUser } = useAppContext();
  const { user_id } = useParams() as { user_id: string };
  const { data: user, error } = useSwr(user_id, getUser);
  
  if (error) {
    return (
      <p className='p-6 text-lg'>{serializeError(error)}</p>
    );
  }

  if (!user) return <Loader />;

  const { displayName, photoUrl } = user;
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
      
      <p className='text-center px-4 mt-2'>About is here</p>
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