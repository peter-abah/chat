import { useForm } from 'react-hook-form';
import { useNavigate, Routes, Route } from 'react-router-dom';
import useUploadImage from '@/hooks/useUploadImage';

import toast from 'react-hot-toast';
import { createGroupChat } from '@/firebase/chats';
import  { serializeError } from '@/lib/utils';

import Form, { FormData } from './Form';
import NotFound from '@/routes/NotFound';
import CropImage from '@/components/CropImage';

interface Props {
  participants: {[index: string]: boolean};
};

const GroupForm = ({participants}: Props) => {
  const navigate = useNavigate();
  const {image, setImage, imgUrl, handleImageChange} = useUploadImage();

  const onSubmit = async ({name, description}: FormData) => {
    try {
      const participantsIds = Object.keys(participants);
      await createGroupChat({
        name,
        description,
        participants: participantsIds,
        picture: image
      });
      navigate('/', {replace: true});
      toast.success('Group created');
    } catch (e) {
      toast.error('An error occured')
    }
  };
  
  const onImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageChange(e);
    navigate('crop')
  };

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
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
};

export default GroupForm;