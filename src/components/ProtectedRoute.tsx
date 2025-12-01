import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // 로그인하지 않은 사용자는 로그인 페이지로 리디렉션
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    // admin 권한이 필요한 페이지에 admin이 아닌 사용자가 접근한 경우 홈으로 리디렉션
    alert('접근 권한이 없습니다.');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
