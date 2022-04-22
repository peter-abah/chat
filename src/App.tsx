import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Home, Chat, Login } from '@/routes';
import { AppContextProvider } from '@/context/AppContext';

function App() {
  return (
    <AppContextProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat/:id' element={<Chat />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </AppContextProvider>
  )
}

export default App;
