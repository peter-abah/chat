import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '@/routes/PrivateRoute';

import SelectUsers from './SelectUsers';
import GroupForm from './GroupForm';

const NewGroup = () => {
  const [participants, setParticipants] = useState<string[]>([]);
  
  const onSelectUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { uid } = e.currentTarget.dataset as { uid: string };
    if (!uid) return;

    if (uid in participants) {
      const filtered = participants.filter((id) => id !== uid);
      setParticipants(filtered);
    } else {
      setParticipants([...participants, uid])
    }
  }
    
  return (
    <Routes>
      <Route
        index
        element={
          <SelectUsers
            participants={participants}
            onSelectUser={onSelectUser}
          />
        }
      />
      <Route element={
        <PrivateRoute redirectPath='./' isAuthorized={participants.length > 0} />
      }>
        <Route
          path='form' 
          element={
           <GroupForm participants={participants} />
          }
        />
      </Route>
    </Routes>
  )
};

export default NewGroup;