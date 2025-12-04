import React from 'react';
import styled from 'styled-components';
import { CommentInfo } from '../../types';

const CommentListContainer = styled.ul`
  list-style: none;
  padding: 1rem; // Add padding
  margin-top: 2rem;
  border: 1px solid #dee2e6; // Add border
  border-radius: 8px; // Add border-radius
  background-color: #f8f9fa; // Slightly different background
`;

const CommentItem = styled.li`
  padding: 1rem;
  background-color: #ffffff; // White background for each comment
  border: 1px solid #e9ecef; // Lighter border for separation
  border-radius: 4px;
  margin-bottom: 0.75rem; // Space between comments

  &:last-child {
    margin-bottom: 0; // No margin for the last item
  }
`;

const Author = styled.strong`
  font-weight: bold;
  margin-right: 0.5rem;
  color: #007bff; // A nice blue color for the author
`;

const CommentMeta = styled.span`
  font-size: 0.8em;
  color: #6c757d;
  margin-left: 0.5rem;
  float: right;
`;

const Text = styled.p`
  margin: 0.5rem 0 0 0;
  line-height: 1.6; // Improved readability
  color: #343a40;
`;

interface CommentListProps {
  comments: CommentInfo[];
}

const CommentList = ({ comments }: CommentListProps) => {
  if (comments?.length === 0) {
    return (
      <CommentListContainer>
        <p style={{ margin: '0', textAlign: 'center', color: '#6c757d' }}>아직 댓글이 없습니다.</p>
      </CommentListContainer>
    );
  }

  return (
    <CommentListContainer>
      {comments?.map((comment) => (
        <CommentItem key={comment.id}>
          <Author>{comment.author}</Author>
          {comment.createdAt && <CommentMeta>{comment.createdAt}</CommentMeta>}
          <Text>{comment.content}</Text>
        </CommentItem>
      ))}
    </CommentListContainer>
  );
};

export default CommentList;
