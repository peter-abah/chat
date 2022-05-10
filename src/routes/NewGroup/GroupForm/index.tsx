import { useForm } from 'react-hook-form';
import { useNavigate, Routes, Route } from 'react-router-dom';
import useUploadFile from '@/hooks/useUploadFile';

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
  const {file, setFile, fileUrl, handleFileChange} = useUploadFile();

  const onSubmit = async ({name, description}: FormData) => {
    try {
      const participantsIds = Object.keys(participants);
      await createGroupChat({
        name,
        description,
        participants: participantsIds,
        picture: file
      });
      navigate('/', {replace: true});
      toast.success('Group created');
    } catch (e) {
      toast.error('An error occured')
    }
  };
  
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e);
    navigate('crop')
  };

  return (
    <Routes>
      <Route
        index
        element={
          <Form
            onSubmit={onSubmit}
            onImgChange={onFileChange}
            clearImage={() => setFile(null)}
            imgUrl={fileUrl}
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

export default GroupForm;