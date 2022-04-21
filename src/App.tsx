import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { Home, Chat, Login } from '@/routes';

function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!auth.currentUser) navigate('/login')
  }, [auth.currentUser]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/chat/:id' element={<Chat />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App;
