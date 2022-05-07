import { Routes, Route } from 'react-router-dom';
import Account from './Account';
import ChangePassword from './ChangePassword';

const Main = () => {
  return (
    <Routes>
      <Route index element={<Account />} />
      <Route path='email' element={<p>Edit Email</p>} />
      <Route path='password' element={<ChangePassword />} />
      <Route path='delete' element={<p>Delete account</p>} />
    </Routes>
  );
};

export default Main;