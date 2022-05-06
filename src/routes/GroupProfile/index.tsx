import useSWR from 'swr'
import { useAppContext } from '@/context/AppContext';
import useSelectParticipants from '@/hooks/useSelectParticipants';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';

import GroupProfile from './GroupProfile';
import PrivateRoute from '@/routes/PrivateRoute';
import SelectUsers from '@/components/SelectUsers';
import Header from '@/components/Header';

import { GroupChat } from '@/types';
import { serializeError } from '@/lib/utils';
import { addUsersToGroup, getChat } from '@/firebase/chats';

const Main = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const { data: chat } = useSWR(id, getChat) as { data: GroupChat };

  const { currentUser } = useAppContext();
  const { participants, onSelectUser } = useSelectParticipants();

  const shouldExclude = (uid: string) => {
    return uid === currentUser?.uid || chat?.participants.includes(uid);
  }
  
  const onNext = async () => {
    const uids = Object.keys(participants);
    if (uids.length <= 0 || chat?.type !== 'group') return;
    
    try {
      await addUsersToGroup(chat, uids);
      navigate(`/chats/${chat.id}`)
    } catch (e) {
      window.alert(e);
    }
  };

  return (
    <Routes>
      <Route index element={<GroupProfile />} />
      <Route
        element={
          <PrivateRoute
            redirectPath='./'
            isAuthorized={chat && currentUser?.uid === chat?.owner}
          />
        }
      >
        <Route
          path='add_participants'
          element={
            <SelectUsers
              participants={participants}
              header={<Header heading='Add participants' />}
              shouldExclude={shouldExclude}
              onSelectUser={onSelectUser}
              onNext={onNext}
            />
          }
        />
      </Route>
    </Routes>
  )
};

export default Main;