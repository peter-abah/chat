import { Outlet, Navigate } from 'react-router-dom'
import { auth } from '@/firebase';

interface Props {
  redirectPath?: string;
}
const PrivateRoute = ({ redirectPath = '/login' }: Props) => {
  if (!auth.currentUser) {
    return <Navigate to={redirectPath} replace />;
  }
  
  return <Outlet />
};

export default PrivateRoute;