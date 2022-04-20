import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home, Chat, Login } from './routes';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/chat/:id' element={<Chat />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App;
