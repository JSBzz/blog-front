import React from 'react';
import styled from 'styled-components';
import { PostInfo } from '../../types';
import { Link } from 'react-router-dom';

const ItemContainer = styled.div`
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h2`
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  color: #343a40;
`;

const Summary = styled.p`
  margin: 0 0 1rem 0;
  color: #868e96;
  line-height: 1.5;
`;

const Meta = styled.span`
  font-size: 0.875rem;
  color: #adb5bd;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background-color: #e9ecef;
  color: #495057;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
`;

interface PostListItemProps {
  post: PostInfo;
}

const PostListItem = ({ post }: PostListItemProps) => {
  return (
    <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
      <ItemContainer>
        <Title>{post.title}</Title>
        <Summary>{post.title}</Summary>
        <Meta>{post.createdAt}</Meta>
        {post.tags && post.tags.length > 0 && (
          <TagsContainer>
            {post.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagsContainer>
        )}
      </ItemContainer>
    </Link>
  );
};

export default PostListItem;
