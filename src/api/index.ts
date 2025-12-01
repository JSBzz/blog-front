// src/api/index.ts
import axios from 'axios';
import { mockPosts } from '../data/mockPosts';
import { PostInfo, CommentInfo } from '../types';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

// API 호출을 시뮬레이션하기 위한 딜레이
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const apiService = {
  /**
   * 모든 게시글 목록을 가져옵니다.
   */
  async getPosts(): Promise<PostInfo[]> {
    await delay(300); // 0.3초 딜레이
    console.log('API: getPosts 호출됨');
    // 최신 글이 위로 오도록 정렬
    return [...mockPosts].sort((a, b) => b.id - a.id);
  },

  /**
   * ID로 특정 게시글을 가져옵니다.
   */
  async getPost(id: number): Promise<PostInfo | undefined> {
    await delay(300);
    console.log(`API: getPost(${id}) 호출됨`);
    return mockPosts.find(p => p.id === id);
  },

  /**
   * 새로운 게시글을 생성합니다.
   */
  async createPost(data: { title: string, content: string, tags: string[] }): Promise<PostInfo> {
    await delay(500);
    console.log('API: createPost 호출됨', data);
    
    const plainText = data.content.replace(/<[^>]*>?/gm, ''); // HTML 태그 제거
    const summary = plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText;

    const newPost: PostInfo = {
      id: Math.max(...mockPosts.map(p => p.id)) + 1,
      title: data.title,
      content: data.content,
      summary: summary,
      date: new Date().toLocaleDateString('ko-KR'),
      tags: data.tags, // 태그 추가
      comments: [],
    };
    mockPosts.push(newPost);
    return newPost;
  },

  /**
   * 특정 게시글에 댓글을 추가합니다.
   */
  async addComment(postId: number, data: { author: string, text: string }): Promise<CommentInfo> {
    await delay(400);
    console.log(`API: addComment(${postId}) 호출됨`, data);

    const post = mockPosts.find(p => p.id === postId);
    if (!post) {
      throw new Error('게시글을 찾을 수 없습니다.');
    }

    const newComment: CommentInfo = {
      id: Date.now(),
      author: data.author,
      text: data.text,
    };
    post.comments.push(newComment);
    return newComment;
  },

  /**
   * 로그인을 처리합니다.
   */
  async login(credentials: { username: string, password: string }): Promise<{ user: any, token: string }> {
    console.log('API: login 호출됨', credentials);
    try {
      const response = await api.post('/authenticate', credentials);
      const { jwt } = response.data;
      // 실제 user 정보는 JWT에서 디코딩하거나 별도 API 호출로 가져와야 하지만,
      // 현재는 플레이스홀더 user 객체를 생성하여 반환합니다.
      const user = { id: credentials.username, name: credentials.username, role: 'user' }; 
      return { user, token: jwt };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }
};

export { api, apiService };
