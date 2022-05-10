import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { 
  Home,
  Chat,
  NewChat,
  NewGroup,
  UserProfile,
  GroupProfile,
  Account,
  Settings,
  Login,
  SignUp,
  NotFound,
  PrivateRoute,
  EditProfile
} from '@/routes';
import { AppContextProvider } from '@/context/AppContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ErrorBoundary>
      <AppContextProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Home />} />
            <Route path='/chats/:id' element={<Chat />} />
            <Route path='/chats/new' element={<NewChat />} />
            <Route path='/groups/new/*' element={<NewGroup />} />
            <Route path='/users/:user_id' element={<UserProfile />} />
            <Route path='/users/edit/*' element={<EditProfile />} />
            <Route path='/groups/:id/*' element={<GroupProfile />} /> 
            <Route path='/account/*' element={<Account />} /> 
            <Route path='/settings' element={<Settings />} /> 
          </Route>
  
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Toaster toastOptions={{className: 'toast'}} />
      </AppContextProvider>
    </ErrorBoundary>
  )
}

export default App;
