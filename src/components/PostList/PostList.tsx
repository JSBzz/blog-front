// src/components/GeulMokrok/GeulMokrok.tsx
import React from 'react';
import styled from 'styled-components';
import { PostInfo } from '../../types';
import PostListItem from './PostListItem';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

interface PostListProps {
  posts: PostInfo[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <ListContainer>
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </ListContainer>
  );
};

export default PostList;
