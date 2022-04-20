import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home, Chat } from './routes';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/chat/:id' element={<Chat />} />
    </Routes>
  )
}

export default App;
