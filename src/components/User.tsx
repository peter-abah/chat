import { User as UserType } from '@/types';
import ProfileImage from './ProfileImage';

const User = ({ user }: { user: UserType }) => {
  const name = user.displayName || 'No name';

  return (
    <div className='flex items-center py-3 px-4'>
      <ProfileImage
        className='mr-3'
        imgUrl={user.picture}
        name={name}
      />
      <p className='text-lg'>{name}</p>
    </div>
  )
};

export default User;