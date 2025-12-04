// src/types/index.ts
export interface CommentInfo {
  id: number;
  author: string;
  content: string;
  createdAt?: string;
}

export interface PostInfo {
  id?: number;
  title: string;
  createdAt?: string;
  contents?: string;
  tags: string[]; // 태그 필드 추가
  comments: CommentInfo[]
}

export interface PostReqInfo {
  id?: number;
  title: string;
  contents?: string;
  tags: string[]; // 태그 추가
}

export interface PostListResponse {
  posts: PostInfo[];
  totalPages: number;
  hasNext: boolean;
}
