import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Home, Chat, Login, SignUp } from '@/routes';
import { AppContextProvider } from '@/context/AppContext';

function App() {
  return (
    <AppContextProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat/:id' element={<Chat />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </AppContextProvider>
  )
}

export default App;
