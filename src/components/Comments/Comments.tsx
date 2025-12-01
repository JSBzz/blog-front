import React, { useState } from 'react';
import styled from 'styled-components';
import { CommentInfo, PostInfo } from '../../types';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { apiService } from '../../api';

const CommentsContainer = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
`;

interface CommentsProps {
  post: PostInfo;
}

const Comments = ({ post }: CommentsProps) => {
  const [comments, setComments] = useState<CommentInfo[]>(post.comments);

  const handleCommentSubmit = async (author: string, text: string) => {
    try {
      const newComment = await apiService.addComment(post.id, { author, text });
      // 상태를 업데이트하여 화면을 다시 렌더링
      setComments([...comments, newComment]);
    } catch (error) {
      console.error("댓글 작성에 실패했습니다:", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  return (
    <CommentsContainer>
      <h3>댓글</h3>
      <CommentForm onSubmit={handleCommentSubmit} />
      <CommentList comments={comments} />
    </CommentsContainer>
  );
};

export default Comments;
