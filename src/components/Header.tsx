import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 1rem 2rem;
  background-color: white;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BlogTitle = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  text-decoration: none;
  color: inherit;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: transparent;
  font-size: 0.9rem;
  cursor: pointer;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <BlogTitle to="/">DEV BLOG</BlogTitle>
      <Navigation>
        {user?.role === 'admin' && <Link to="/write">글쓰기</Link>}
        {user ? (
          <AuthButton onClick={handleLogout}>로그아웃</AuthButton>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;
