import React, { useState } from 'react';
import { removeProperty } from '@/lib/utils';

const useSelectParticipants = () => {
  const [participants, setParticipants] = useState<Record<string, boolean>>({});
  
  const onSelectUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { uid } = e.currentTarget.dataset as { uid: string };
    if (!uid) return;

    if (participants.hasOwnProperty(uid)) {
      const filtered = removeProperty(participants, uid);
      setParticipants(filtered);
    } else {
      setParticipants({...participants, [uid]: true})
    }
  }
  
  const reset = () => setParticipants({});
  
  return { participants, setParticipants, onSelectUser, reset };
};

export default useSelectParticipants;