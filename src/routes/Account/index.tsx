import { Routes, Route } from 'react-router-dom';
import Account from './Account';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';

const Main = () => {
  return (
    <Routes>
      <Route index element={<Account />} />
      <Route path='email' element={<ChangeEmail />} />
      <Route path='password' element={<ChangePassword />} />
      <Route path='delete' element={<p>Delete account</p>} />
    </Routes>
  );
};

export default Main;