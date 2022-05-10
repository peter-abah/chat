import { Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import useSelectParticipants from '@/hooks/useSelectParticipants';
import { useAppContext } from '@/context/AppContext';
import PrivateRoute from '@/routes/PrivateRoute';

import Header from '@/components/Header'
import SelectUsers from '@/components/SelectUsers';
import GroupForm from './GroupForm';
import NotFound from '@/routes/NotFound';

const NewGroup = () => {
  const { currentUser } = useAppContext();
  const navigate = useNavigate();
  const {participants, onSelectUser} = useSelectParticipants();
  
  const onNext = () => navigate('form');
  const shouldExclude = (uid: string) => uid === currentUser?.uid;
  
  return (
    <Routes>
      <Route
        index
        element={
          <SelectUsers
            header={
              <Header
                heading='Create group'
                subheading='Add participants'
              />
            }
            participants={participants}
            onSelectUser={onSelectUser}
            onNext={onNext}
            shouldExclude={shouldExclude}
          />
        }
      />
      <Route element={
        <PrivateRoute redirectPath='./' isAuthorized={Object.keys(participants).length > 0} />
      }>
        <Route
          path='form/*' 
          element={
           <GroupForm participants={participants} />
          }
        />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
)
};

export default NewGroup;