import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
  padding: 1rem; // Larger padding
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); // Add box-shadow
`;

const BaseInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  width: 100%; // Make inputs full width
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075); // Inner shadow
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const NameInput = styled(BaseInput)`
  width: 100%;
`;

const CommentTextarea = styled.textarea`
  ${BaseInput as any}
  flex: 1;      /* 왼쪽 공간 모두 차지 */
  resize: none;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 14px;
  min-height: 40px;
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  background: #fafafa;
  gap: 10px;
`

const SubmitButton = styled.button`
  align-self: flex-end;
  padding: 0.4rem 0.4rem; // Larger padding
  border: none;
  border-radius: 4px;
  min-height: 54px;
  min-width: 50px;
  background-color: #007bff; // Primary blue color
  color: white;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out; // Add transition

  &:hover {
    background-color: #0056b3;
  }
`;

interface CommentFormProps {
  onSubmit: (author: string, content: string) => void;
}

const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!author || !content) {
      alert('이름과 댓글 내용을 모두 입력해주세요.');
      return;
    }
    onSubmit(author, content);
    setAuthor('');
    setContent('');
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <NameInput
        type="text"
        placeholder="이름"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <CommentContainer>
        <CommentTextarea
          placeholder="댓글을 남겨보세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <SubmitButton type="submit">등록</SubmitButton>
      </CommentContainer>
    </FormContainer>
  );
};

export default CommentForm;
