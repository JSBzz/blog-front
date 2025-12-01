// src/types/index.ts
export interface CommentInfo {
  id: number;
  author: string;
  text: string;
}

export interface PostInfo {
  id: number;
  title: string;
  summary: string;
  date: string;
  content?: string;
  tags: string[]; // 태그 필드 추가
  comments: CommentInfo[];
}
