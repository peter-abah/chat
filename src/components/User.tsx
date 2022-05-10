import React from 'react';
import { User as UserType } from '@/types';
import ProfileImage from './ProfileImage';

interface Props {
  user: UserType;
  isSelected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const User = ({ user, onClick, isSelected }: Props) => {
  const name = user.displayName || 'No name';

  return (
    <button 
      className='flex w-full items-center py-2 px-4'
      onClick={onClick}
      data-uid={user.uid}
    >
      <ProfileImage
        className='mr-3 md:w-12 md:h-12'
        imgUrl={user.photoUrl}
        name={name}
        isSelected={isSelected}
      />
      <p className='font-bold md:text-lg'>{name}</p>
    </button>
  )
};

export default User;