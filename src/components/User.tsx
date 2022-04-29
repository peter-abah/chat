import React from 'react';
import { User as UserType } from '@/types';
import ProfileImage from './ProfileImage';

interface Props {
  user: UserType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const User = ({ user, onClick }: Props) => {
  const name = user.displayName || 'No name';

  return (
    <button 
      className='flex items-center py-3 px-4'
      onClick={onClick}
      data-uid={user.uid}
    >
      <ProfileImage
        className='mr-3'
        imgUrl={user.picture}
        name={name}
      />
      <p className='font-bold'>{name}</p>
    </button>
  )
};

export default User;