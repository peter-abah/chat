import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Routes, Route } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAppContext } from '@/context/AppContext';
import useUploadImage from '@/hooks/useUploadImage';
import { updateUser } from '@/firebase/users';
import { serializeError } from '@/lib/utils';

import Form, { FormData } from './Form';
import Loader from '@/components/Loader';
import CropImage from '@/components/CropImage';

const EditProfile = () => {
  const { currentUser, refetchUser } = useAppContext();
  const navigate = useNavigate();

  const {image, setImage, imgUrl, handleImageChange} = useUploadImage();
  const [userImgUrl, setUserImgUrl] = useState<string | null>(currentUser?.photoUrl || null)
 
  const onSubmit = async ({displayName, about}: FormData) => {
    try {
      await updateUser({
        displayName,
        about,
        picture: image,
        imgUrl: userImgUrl
      });
      refetchUser();
      navigate(`/users/${currentUser?.uid}`, { replace: true });
    } catch (e) {
      toast.error('An error occured');
    }
  };

  const onImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageChange(e);
    navigate('crop')
  };
  
  const clearImage = () => {
    setImage(null);
    setUserImgUrl(null);
  }

  return (
    <Routes>
      <Route
        index
        element={
          <Form
            onSubmit={onSubmit}
            onImgChange={onImgChange}
            clearImage={clearImage}
            imgUrl={imgUrl || userImgUrl}
          />
        }
      />
      <Route
        path='crop'
        element={
          <CropImage
            src={imgUrl}
            onSaveCrop={(croppedImage) => setImage(croppedImage)}
          />
        }
      />
    </Routes>
  )
};

export default EditProfile;