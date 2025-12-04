// src/api/index.ts
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { PostInfo, CommentInfo, PostReqInfo, PostListResponse } from '../types';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials:true,
  headers: {
    'Content-type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const apiService = {
  /**
   * 모든 게시글 목록을 가져옵니다.
   */
  async getPosts(page = 1, limit = 5): Promise<PostListResponse> {
    const response = await api.get('/api/posts', {
      params: {
        page: page - 1, // Spring Data JPA는 페이지 번호가 0부터 시작합니다.
        size: limit,
      },
    });

    const { content, totalPages, last } = response.data;
    
    return {
      posts: content,
      totalPages,
      hasNext: !last,
    };
  },

  /**
   * ID로 특정 게시글을 가져옵니다.
   */
  async getPost(id: number): Promise<PostInfo | undefined> {
    const response = await api.get(`/api/posts/${id}`);
    return response.data
  },

  async getPostComment(id: number): Promise<CommentInfo[] | undefined> {
    const response = await api.get(`/api/posts/comment/${id}`);
    return response.data
  },

  /**
   * 새로운 게시글을 생성합니다.
   */
  async createPost(data: { title: string, contents: string, tags: string[] }): Promise<PostReqInfo> {
    const newPost: PostReqInfo = {
      title: data.title,
      contents: data.contents,
      tags: data.tags, // 태그 추가
    };
    const response = await api.post('/api/posts', newPost);
    return response.data;
  },

  /**
   * 특정 게시글에 댓글을 추가합니다.
   */
  async addComment(postId: number, data: { author: string, content: string }): Promise<CommentInfo> {
    console.log(`API: addComment(${postId}) 호출됨`, data);
    const response = await api.post(`/api/posts/comment/${postId}`, data);
    return response.data;
  },

  /**
   * 로그인을 처리합니다.
   */
  async login(credentials: { username: string, password: string }): Promise<{ user: any, token: string }> {
    console.log('API: login 호출됨', credentials);
    try {
      const response = await api.post('/authenticate', credentials);
      const { jwt } = response.data;
      const decodedToken: any = jwtDecode(jwt); // Decode the JWT
      const user = { 
        id: decodedToken.id, 
        name: decodedToken.name, 
        role: decodedToken.role 
      }; 
      return { user, token: jwt };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }
};

export { apiService };
