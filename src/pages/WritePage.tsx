import React, { useState, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { apiService } from '../api';

const WriteContainer = styled.div`
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  margin: 1rem;
`;

const WriteForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TitleInput = styled.input`
  padding: 0.75rem;
  font-size: 1.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

const TagInput = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

const EditorWrapper = styled.div`
  .ql-editor {
    min-height: 400px;
    font-size: 1.1rem;
  }
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [tagsInput, setTagsInput] = useState(''); // 태그 입력을 위한 상태 추가
  const [loading, setLoading] = useState(false);
  const quillRef = useRef<ReactQuill>(null);
  const navigate = useNavigate();

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const imageUrl = reader.result as string;
          const editor = quillRef.current?.getEditor();
          if (editor) {
            const range = editor.getSelection(true);
            editor.insertEmbed(range.index, 'image', imageUrl);
          }
        };
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0); // 태그 파싱
    try {
      const newPost = await apiService.createPost({ title, contents, tags }); // 태그 전달
      alert('새 글이 성공적으로 작성되었습니다.');
      navigate(`/post/${newPost.id}`);
    } catch (error) {
      console.error("글 작성에 실패했습니다:", error);
      alert("글 작성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <WriteContainer>
      <h1>글쓰기</h1>
      <WriteForm onSubmit={handleSubmit}>
        <TitleInput
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TagInput // 태그 입력 필드 추가
          type="text"
          placeholder="태그를 쉼표로 구분하여 입력하세요 (예: React, TypeScript)"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
        />
        <EditorWrapper>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={contents}
            onChange={setContents}
            modules={modules}
            placeholder="내용을 입력하세요..."
          />
        </EditorWrapper>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? '작성 중...' : '글 작성 완료'}
        </SubmitButton>
      </WriteForm>
    </WriteContainer>
  );
};

export default WritePage;
