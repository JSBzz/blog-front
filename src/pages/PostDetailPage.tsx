import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../api';
import Comments from '../components/Comments/Comments';
import 'react-quill/dist/quill.snow.css';

const DetailContainer = styled.div`
  max-width: 900px; // Set a max-width for better readability on large screens
  margin: 2rem auto; // Center the container
  padding: 3rem; // Increased padding
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); // More prominent shadow
`;

const Title = styled.h1`
  font-size: 2.5rem; // Larger title
  margin-bottom: 1rem;
  color: #343a40;
  text-align: center;
`;

const PostMeta = styled.p`
  font-size: 0.95rem;
  color: #6c757d;
  padding-bottom: 3rem; 
  margin-bottom: 2rem; // Increased margin
  border-bottom: 1px solid #e9ecef;
  text-align: center;
  
`;

const Content = styled.div`
  font-family: 'Georgia', serif; // Use a serif font for readability
  font-size: 1.15rem; // Slightly larger font size
  line-height: 1.8; // Increased line height for better readability
  color: #212529; // Darker text for contrast
  margin-top: 2rem;
  padding-top: 2rem;

  &.ql-editor {
    padding: 0;
    font-size: 1.15rem;
    line-height: 1.8;
    
    // Styling for elements within ReactQuill content
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Helvetica Neue', sans-serif;
      margin-top: 2rem;
      margin-bottom: 1rem;
      color: #343a40;
    }

    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    h3 { font-size: 1.5rem; }
    h4 { font-size: 1.25rem; }
    h5 { font-size: 1.15rem; }
    h6 { font-size: 1rem; }

    p {
      margin-bottom: 1.2rem;
    }

    a {
      color: #007bff;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }

    img {
      max-width: 100%;
      height: auto;
      display: block; // Center images
      margin: 2rem auto; // Space above and below images
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    blockquote {
      border-left: 4px solid #ced4da;
      padding-left: 1.5rem;
      margin: 1.5rem 0;
      color: #6c757d;
      font-style: italic;
    }

    pre {
      background-color: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
      font-size: 0.95rem;
      margin: 1.5rem 0;
    }

    ul, ol {
      margin-bottom: 1.2rem;
      padding-left: 1.5rem;
    }

    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => apiService.getPost(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러: {error.message}</div>;
  }

  if (!post) {
    return <div>게시글이 없습니다.</div>;
  }

  return (
    <DetailContainer>
      <Title>{post.title}</Title>
      <PostMeta>작성일: {post.createdAt}</PostMeta>
      <Content
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: post.contents || '' }}
      />
      <Comments post={post}/>
    </DetailContainer>
  );
};

export default PostDetailPage;