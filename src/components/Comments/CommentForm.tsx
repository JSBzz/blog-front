import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 2rem;
  padding: 2rem; // Larger padding
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
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  padding: 0.75rem 1.5rem; // Larger padding
  border: none;
  border-radius: 4px;
  background-color: #007bff; // Primary blue color
  color: white;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out; // Add transition

  &:hover {
    background-color: #0056b3;
  }
`;

interface CommentFormProps {
  onSubmit: (author: string, text: string) => void;
}

const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!author || !text) {
      alert('이름과 댓글 내용을 모두 입력해주세요.');
      return;
    }
    onSubmit(author, text);
    setAuthor('');
    setText('');
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <NameInput
        type="text"
        placeholder="이름"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <CommentTextarea
        placeholder="댓글을 남겨보세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <SubmitButton type="submit">댓글 등록</SubmitButton>
    </FormContainer>
  );
};

export default CommentForm;
