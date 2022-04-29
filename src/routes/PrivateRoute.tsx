import { Outlet, Navigate } from 'react-router-dom'
import { auth } from '@/firebase';

interface Props {
  redirectPath?: string;
  isAuthorized?: boolean
};
const PrivateRoute = ({ redirectPath = '/login', isAuthorized }: Props) => {
  isAuthorized ||= !!auth.currentUser;
  if (!isAuthorized) {
    return <Navigate to={redirectPath} replace />;
  }
  
  return <Outlet />
};

export default PrivateRoute;