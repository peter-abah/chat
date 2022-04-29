import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { 
  Home,
  Chat,
  NewChat,
  NewGroup,
  Login,
  SignUp,
  PrivateRoute
} from '@/routes';
import { AppContextProvider } from '@/context/AppContext';
import ErrorBoundary from '@/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AppContextProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Home />} />
            <Route path='/chats/:id' element={<Chat />} />
            <Route path='/chats/new' element={<NewChat />} />
            <Route path='/chats/new_group/*' element={<NewGroup />} />
          </Route>
  
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </AppContextProvider>
    </ErrorBoundary>
  )
}

export default App;
