import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import Layout from './components/Layout';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import WritePage from './pages/WritePage'; // 나중에 생성할 컴포넌트
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler'; // Import the OAuth2RedirectHandler

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Routes>
          {/* 공개 경로 */}
          <Route path="/" element={<PostListPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/api/auth/callback/google" element={<OAuth2RedirectHandler />} /> {/* OAuth redirect route */}

          {/* 관리자 전용 경로 */}
          <Route
            path="/write"
            element={
              <ProtectedRoute requireAdmin={true}>
                <WritePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
