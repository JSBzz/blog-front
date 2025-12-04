import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { apiService } from '../api';
import { jwtDecode } from 'jwt-decode';

// 사용자 정보 타입
interface User {
  id: string;
  name: string;
  role: string; // Changed to string to handle potential uppercase from backend
}

// 1. Context 타입 정의
interface AuthContextType {
  user: User | null;
  error: string | null; // 에러 메시지를 위한 상태 추가
  login: (credentials: { username: string, password: string }) => Promise<void>;
  logout: () => void;
}

// 2. Context 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Provider 컴포넌트 생성
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const user = {
          id: decodedToken.id,
          name: decodedToken.name,
          role: decodedToken.role.toLowerCase(), // Convert role to lowercase
        };
        setUser(user);
      } catch (error) {
        console.error("Failed to decode token from localStorage:", error);
        localStorage.removeItem('token'); // Clear invalid token
      }
    }
  }, []); // Run only once on mount

  const login = async (credentials: { username: string, password: string }) => {
    setError(null); // 로그인 시도 시 에러 초기화
    try {
      const { user: apiUserData, token } = await apiService.login(credentials);
      const userData = {
        ...apiUserData,
        role: apiUserData.role.toLowerCase(), // Normalize role to lowercase
      };
      setUser(userData);
      localStorage.setItem('token', token); // Store token in localStorage
    } catch (err: any) {
      console.error("로그인 실패:", err);
      setError(err.response?.data?.message || "로그인 중 오류가 발생했습니다."); // API 에러 메시지 활용 또는 일반 메시지
      throw err; // 에러를 다시 던져서 호출하는 컴포넌트에서 처리할 수 있도록 함
    }
  };

  const logout = () => {
    setUser(null);
    setError(null); // 로그아웃 시 에러 상태 초기화
    localStorage.removeItem('token'); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Custom Hook 생성
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 안에서만 사용해야 합니다.');
  }
  return context;
};
