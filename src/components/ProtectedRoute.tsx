import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../utils/cookies';

interface ProtectedRouteProps {
  children: React.ReactNode;
  path?: string;
  exact?: boolean;
}

export default function ProtectedRoute({ children, path, exact }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Redirect to="/login" />;
  }
  return <>{children}</>;
}

