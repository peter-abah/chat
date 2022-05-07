import { auth, db } from '.';
import { doc, setDoc, deleteDoc, QueryDocumentSnapshot } from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
  deleteUser as deleteUserFirebase,
  reauthenticateWithCredential,
  AuthError,
  AuthErrorCodes,
  EmailAuthProvider,
  GoogleAuthProvider
} from "firebase/auth";

import { getAllUserChats, removeUserFromGroup } from './chats';
import { getAllUserMessages } from './messages';

import { User, Chat } from '@/types';
export const providers = {
  google: new GoogleAuthProvider()
};
export type ProviderName = keyof (typeof providers);

interface UserData {
  email: string;
  password: string;
  name: string;
};

const addUserToDb = async (user: User) => {
  const docRef = doc(db, 'users', user.uid);
  await setDoc(docRef, user, { merge: true });
};

export const signUpWithEmail = async (userData: UserData) => {
  const { name, email, password } = userData;
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  if (auth.currentUser) {
    await addUserToDb({
      uid: auth.currentUser.uid,
      displayName: name,
      about: '...'
    });
    return auth.currentUser;
  }
  throw new Error('Unknown Error')
};

export const signInWithEmail = async (email: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  if (auth.currentUser) return auth.currentUser;
  throw new Error('Unknown Error');
};

export const signInWithProvider = async (providerName: ProviderName) => {
  const provider = providers[providerName];
  const userCredential = await signInWithPopup(auth, provider);

  if (!auth.currentUser) throw new Error('Unknown error');
  
  const { displayName, photoURL, uid } = auth.currentUser;
  addUserToDb({
    displayName: displayName || 'Anonymous',
    photoUrl: photoURL,
    uid
  });
  return auth.currentUser;
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

export const authorize = (isAuthorized: boolean, message = 'Not authorized') => {
  if (!isAuthorized) throw new Error(message);
};

const reAuthenticateUser = async (password: string) => {
  authorize(!!auth.currentUser?.email, 'User does not have email');
  
  const credential = EmailAuthProvider.credential(
    auth.currentUser!.email!,
    password
  );
  
  await reauthenticateWithCredential(auth.currentUser!, credential)
};

export const updateUserEmail = async (email: string, password: string) => {
  await reAuthenticateUser(password);
  
  await updateEmail(auth.currentUser!, email);
};

export const updateUserPassword = async (prevPassword: string, newPassword: string) => {
  await reAuthenticateUser(prevPassword);
  
  await updatePassword(auth.currentUser!, newPassword);
};

const deleteChats = (userChats: QueryDocumentSnapshot[]) => {
  for (let chatDoc of userChats) {
    const data = chatDoc.data() as Chat;
    if (data.type === 'private') {
      deleteDoc(chatDoc.ref);
    } else {
      removeUserFromGroup(data, auth.currentUser!.uid);
    }
  }
};

const deleteAllUserData = async () => {
  authenticate();

  const [userChats, userMessages] = await Promise.all([
    getAllUserChats(),
    getAllUserMessages()
  ]);

  deleteChats(userChats);
  userMessages.forEach((doc) => deleteDoc(doc.ref));
};

export const deleteUser = async (password: string) => {
  await reAuthenticateUser(password);
  deleteAllUserData();
  await deleteUserFirebase(auth.currentUser!);
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
      return { unknown: { message: "An unexpected error occured" }};
  }
};
