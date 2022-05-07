import { Routes, Route } from 'react-router-dom';
import Account from './Account';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import DeleteAccount from './DeleteAccount';

const Main = () => {
  return (
    <Routes>
      <Route index element={<Account />} />
      <Route path='email' element={<ChangeEmail />} />
      <Route path='password' element={<ChangePassword />} />
      <Route path='delete' element={<DeleteAccount />} />
    </Routes>
  );
};

export default Main;