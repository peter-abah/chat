import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { 
  Home,
  Chat,
  NewChat,
  Login,
  SignUp,
  PrivateRoute
} from '@/routes';
import { AppContextProvider } from '@/context/AppContext';

function App() {
  return (
    <AppContextProvider>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/chats/:id' element={<Chat />} />
          <Route path='/chats/new' element={<NewChat />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </AppContextProvider>
  )
}

export default App;
