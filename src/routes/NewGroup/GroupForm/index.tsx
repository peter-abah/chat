import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Routes, Route } from 'react-router-dom';
import useAsync from '@/hooks/useAsync';

import { createGroupChat } from '@/firebase/chats';
import  { serializeError } from '@/lib/utils';

import CropImage from './CropImage';
import Form from './Form';
import Loader from '@/components/Loader';

interface Props {
  participants: {[index: string]: boolean};
};
interface FormData {
  name: string;
};

const GroupForm = ({participants}: Props) => {
  const navigate = useNavigate();
  const { loading, func: createGroup } = useAsync(createGroupChat);
  const [image, setImage] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  
  useEffect(() => {
    if (imgUrl) {
      URL.revokeObjectURL(imgUrl)
    }
    const url = image ? URL.createObjectURL(image) : null;
    setImgUrl(url);
  }, [image]);

  const onSubmit = async ({name}: FormData) => {
    try {
      const participantsIds = Object.keys(participants);
      await createGroup({
        name,
        participants: participantsIds,
        picture: image
      });
      navigate('/');
    } catch (e) {
      window.alert(serializeError(e));
    }
  };
  
  const onImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.currentTarget.files?.[0];
    if (img) setImage(img);
    navigate('crop');
  };

  if (loading) return <Loader />

  return (
    <Routes>
      <Route
        index
        element={
          <Form
            onSubmit={onSubmit}
            onImgChange={onImgChange}
            clearImage={() => setImage(null)}
            imgUrl={imgUrl}
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

export default GroupForm;