import { Outlet, Navigate } from 'react-router-dom'
import { useAppContext } from '@/context/AppContext';

interface Props {
  redirectPath?: string;
}
const PrivateRoute = ({ redirectPath = '/login' }: Props) => {
  const { currentUser } = useAppContext();
  if (!currentUser) {
    return <Navigate to={redirectPath} replace />;
  }
  
  return <Outlet />
};

export default PrivateRoute;