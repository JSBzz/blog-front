import React from 'react';
import styled from 'styled-components';
import { PostInfo } from '../../types';
import { Link } from 'react-router-dom';
import { getPlainTextSummary } from '../../utils/postUtils'; // Import the utility function

const ItemContainer = styled.li`
  padding: 1rem;
  min-height: 180px; /* Adjusted to match thumbnail height */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  list-style: none;
  display: flex;
  gap: 1.5rem;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    gap: 1.5rem;
    width: 100%;
  }
`;

const Thumbnail = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Distribute space */
  max-width: 100%;
  min-width: 0; /* Allow content to shrink */
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
  flex-grow: 1; /* Allow summary to take available space */
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* Add ellipsis for truncated text */
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
  thumbnailUrl?: string | null;
}

const DEFAULT_THUMBNAIL_URL = 'https://via.placeholder.com/180?text=NoImage'; // Default image URL, adjust size

const PostListItem = React.forwardRef<HTMLLIElement, PostListItemProps>(({ post, thumbnailUrl }, ref) => {
  const summaryText = getPlainTextSummary(post.contents || '', 150); // Get the summary

  return (
    <ItemContainer ref={ref}>
      <Link to={`/post/${post.id}`}>
        <Thumbnail src={thumbnailUrl || DEFAULT_THUMBNAIL_URL} alt={post.title} />
        <ContentContainer>
          <Title>{post.title}</Title>
          <Summary>{summaryText}</Summary>
          <Meta>{post.createdAt}</Meta>
          {post.tags && post.tags.length > 0 && (
            <TagsContainer>
              {post.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagsContainer>
          )}
        </ContentContainer>
      </Link>
    </ItemContainer>
  );
});

export default PostListItem;
