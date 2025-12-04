// src/api/index.ts
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { mockPosts } from '../data/mockPosts';
import { PostInfo, CommentInfo, PostReqInfo } from '../types';

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

// API 호출을 시뮬레이션하기 위한 딜레이
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const apiService = {
  /**
   * 모든 게시글 목록을 가져옵니다.
   */
  async getPosts(): Promise<PostInfo[]> {
    const response = await api.get('/api/posts');
    return response.data?.content;
  },

  /**
   * ID로 특정 게시글을 가져옵니다.
   */
  async getPost(id: number): Promise<PostInfo | undefined> {
    const response = await api.get(`/api/posts/${id}`);
    return response.data
  },

  /**
   * 새로운 게시글을 생성합니다.
   */
  async createPost(data: { title: string, contents: string, tags: string[] }): Promise<PostReqInfo> {
    
    const plainText = data.contents.replace(/<[^>]*>?/gm, ''); // HTML 태그 제거
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
  async addComment(postId: number, data: { author: string, text: string }): Promise<CommentInfo> {
    console.log(`API: addComment(${postId}) 호출됨`, data);
    const response = await api.post(`/api/posts/${postId}/comments`, data);
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

export { api, apiService };
