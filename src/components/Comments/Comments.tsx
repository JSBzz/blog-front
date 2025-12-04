import React from 'react';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PostInfo } from '../../types';
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
  const queryClient = useQueryClient();

  const { data: comment, isLoading, isError, error } = useQuery({
    queryKey: ['comment', post.id],
    queryFn: () => apiService.getPostComment(Number(post.id)),
    enabled: !!post.id,
  });

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: (variables: { author: string; content: string }) => 
      apiService.addComment(post.id!, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', post.id] });
    },
    onError: (error) => {
      console.error("댓글 작성에 실패했습니다:", error);
      alert("댓글 작성에 실패했습니다.");
    },
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

  const handleCommentSubmit = (author: string, content: string) => {
    addComment({ author, content });
  };

  return (
    <CommentsContainer>
      <h3>댓글</h3>
      <CommentForm onSubmit={handleCommentSubmit} />
      <CommentList comments={comment || []} />
      {isPending && <p>댓글을 등록하는 중...</p>}
    </CommentsContainer>
  );
};

export default Comments;
