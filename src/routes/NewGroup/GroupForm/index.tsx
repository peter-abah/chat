import { useForm } from 'react-hook-form';
import { useNavigate, Routes, Route } from 'react-router-dom';
import useAsync from '@/hooks/useAsync';
import useUploadImage from '@/hooks/useUploadImage';

import toast from 'react-hot-toast';
import { createGroupChat } from '@/firebase/chats';
import  { serializeError } from '@/lib/utils';

import Form from './Form';
import Loader from '@/components/Loader';
import CropImage from '@/components/CropImage';

interface Props {
  participants: {[index: string]: boolean};
};
interface FormData {
  name: string;
};

const GroupForm = ({participants}: Props) => {
  const navigate = useNavigate();
  const { loading, func: createGroup } = useAsync(createGroupChat);
  const {image, setImage, imgUrl, handleImageChange} = useUploadImage();

  const onSubmit = async ({name}: FormData) => {
    try {
      const participantsIds = Object.keys(participants);
      await createGroup({
        name,
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