import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../api'; // Import apiService

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const mountedRef = useRef(false); // Add mountedRef

  useEffect(() => {
    // Prevent double execution in React.StrictMode
    if (mountedRef.current) {
      return;
    }
    mountedRef.current = true;

    const params = new URLSearchParams(location.search);
    console.log(params)
    console.log(location)
    const code = params.get('code');
    const error = params.get('error');

    if (error) {
      console.error('OAuth login failed:', error);
      setErrorMessage('OAuth 로그인에 실패했습니다. 다시 시도해주세요.');
      setLoading(false);
      navigate('/login');
      return;
    }

    if (code) {
      const exchangeCode = async () => {
        try {
          setLoading(true);
          const jwtToken = await apiService.exchangeOAuthCodeForToken(code);
          setAuthToken(jwtToken);
          navigate('/');
        } catch (err: any) {
          console.error('Failed to exchange OAuth code for token:', err);
          setErrorMessage(err.response?.data?.message || '토큰 교환 중 오류가 발생했습니다.');
          navigate('/login');
        } finally {
          setLoading(false);
        }
      };
      exchangeCode();
    } else {
      console.error('OAuth callback received no code.');
      setErrorMessage('OAuth 로그인 중 오류가 발생했습니다.');
      setLoading(false);
      navigate('/login');
    }
  }, [location, navigate, setAuthToken]);

  if (loading) {
    return (
      <div>
        <p>OAuth 로그인 처리 중...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div>
        <p>에러: {errorMessage}</p>
      </div>
    );
  }

  return null;
};

export default OAuth2RedirectHandler;
