// src/components/GeulMokrok/GeulMokrok.tsx
import React from 'react';
import styled from 'styled-components';
import { PostInfo } from '../../types';
import PostListItem from './PostListItem';
import { extractFirstImageUrl } from '../../utils/postUtils';

const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0;
  margin: 0;
`;

interface PostListProps {
  posts: PostInfo[];
}

const PostList = React.forwardRef<HTMLLIElement, PostListProps>(({ posts }, ref) => {
  return (
    <ListContainer>
      {posts.map((post, index) => {
        const thumbnailUrl = extractFirstImageUrl(post.contents || '');
        if (posts.length === index + 1) {
          return <PostListItem ref={ref} key={post.id} post={post} thumbnailUrl={thumbnailUrl} />;
        } else {
          return <PostListItem key={post.id} post={post} thumbnailUrl={thumbnailUrl} />;
        }
      })}
    </ListContainer>
  );
});

export default PostList;
