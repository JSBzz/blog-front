import React, { useState, useEffect } from 'react';
import PostList from '../components/PostList/PostList';
import { PostInfo } from '../types';
import { apiService } from '../api';

const PostListPage = () => {
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await apiService.getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("게시글 목록을 불러오는 데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return <PostList posts={posts} />;
};

export default PostListPage;
