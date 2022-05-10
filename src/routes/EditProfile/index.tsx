import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Routes, Route } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAppContext } from '@/context/AppContext';
import useUploadFile from '@/hooks/useUploadFile';
import { updateUser } from '@/firebase/users';
import { serializeError } from '@/lib/utils';

import Form, { FormData } from './Form';
import Loader from '@/components/Loader';
import CropImage from '@/components/CropImage';
import NotFound from '@/routes/NotFound';

const EditProfile = () => {
  const { currentUser, refetchUser } = useAppContext();
  const navigate = useNavigate();

  const {file, setFile, fileUrl, handleFileChange} = useUploadFile();
  const [userImgUrl, setUserImgUrl] = useState<string | null>(currentUser?.photoUrl || null)
 
  const onSubmit = async ({displayName, about}: FormData) => {
    try {
      await updateUser({
        displayName,
        about,
        picture: file,
        imgUrl: userImgUrl
      });
      refetchUser();
      navigate(`/users/${currentUser?.uid}`, { replace: true });
    } catch (e) {
      toast.error('An error occured');
    }
  };

  const onImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e);
    navigate('crop')
  };
  
  const clearFile = () => {
    setFile(null);
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
            clearImage={clearFile}
            imgUrl={fileUrl || userImgUrl}
          />
        }
      />
      <Route
        path='crop'
        element={
          <CropImage
            src={fileUrl}
            onSaveCrop={(croppedImage) => setFile(croppedImage)}
          />
        }
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
};

export default EditProfile;