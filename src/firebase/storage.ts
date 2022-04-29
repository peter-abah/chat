import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, auth } from '.';
import { authenticate } from './auth';
import uniqid from 'uniqid';

export const saveFile = async (file: File, filename?: string) => {
  authenticate();
  
  const fileExt = file.type.split('/')[1];
  filename ||= `${file.name}_${uniqid()}`;
  const fileRef = ref(
    storage,
    `${auth.currentUser!.uid}/${filename}.${fileExt}`
   );
   
   await uploadBytes(fileRef, file);
   return getDownloadURL(fileRef);
};