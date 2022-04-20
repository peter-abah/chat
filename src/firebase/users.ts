import { auth } from '.';

import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";

interface UserData {
  email: string;
  password: string;
  name: string;
};

const signUpWithEmail = async (userData: UserData) => {
  const { name, email, password } = userData;
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName: name });

  if (auth.currentUser) return auth.currentUser;
  throw new Error('Unknown Error')
};

export const signInWithEmail = async (email: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  if (auth.currentUser) return auth.currentUser;
  throw new Error('Unknown Error');
};