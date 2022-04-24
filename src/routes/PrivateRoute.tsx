import { Outlet, Navigate } from 'react-router-dom'
import { useAppContext } from '@/context/AppContext';

interface Props {
  redirectPath?: string;
}
const PrivateRoute = ({ redirectPath = '/login' }: Props) => {
  const { isSignedIn } = useAppContext();
  if (!isSignedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  
  return <Outlet />
};

export default PrivateRoute;