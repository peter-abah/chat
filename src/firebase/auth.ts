import { auth, db } from '.';
import { doc, setDoc } from 'firebase/firestore';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    AuthError,
    AuthErrorCodes,
} from "firebase/auth";

import { User } from '@/types';

interface UserData {
  email: string;
  password: string;
  name: string;
};

const addUserToDb = async (user: User) => {
  const docRef = doc(db, 'users', user.uid);
  await setDoc(docRef, user);
};

export const signUpWithEmail = async (userData: UserData) => {
  const { name, email, password } = userData;
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  if (auth.currentUser) {
    await addUserToDb({ uid: auth.currentUser.uid, displayName: name });
    return auth.currentUser;
  }
  throw new Error('Unknown Error')
};

export const signInWithEmail = async (email: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  if (auth.currentUser) return auth.currentUser;
  throw new Error('Unknown Error');
};

export const signOutUser = () => {
  signOut(auth);
};

export const authenticate = (message?: string) => {
  message ||= 'User must be logged in'
  if (!auth.currentUser) {
    throw new Error(message);
  }
};

export const errorToMsg = (e: AuthError) => {
  switch (e.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      return { email: { message: "Email already exists" }};
    case AuthErrorCodes.USER_DELETED:
      return { email: { message: "Account not found." }};
    case AuthErrorCodes.INVALID_EMAIL:
      return  { email: { message: "Invalid email" }};
    case AuthErrorCodes.INVALID_PASSWORD:
      return { password: { message: "Password is incorrect" }};
    default:
      window.alert(JSON.stringify(e));
      return { unknown: { message: "An unexpected error occured" }};
  }
};
