import React, { useRef, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import PostList from '../components/PostList/PostList';
import { apiService } from '../api';

const PostListPage = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => apiService.getPosts(pageParam, 5),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasNext ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const observer = useRef<IntersectionObserver>();

  const lastPostElementRef = useCallback(
    (node: HTMLLIElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );
  
  if (status === 'pending') {
    return <div>로딩 중...</div>;
  }

  if (status === 'error') {
    return <div>에러: {error.message}</div>;
  }

  const posts = data.pages.flatMap(page => page.posts);

  return (
    <>
      <PostList posts={posts} ref={lastPostElementRef} />
      {isFetchingNextPage && <div>로딩 중...</div>}
      {!hasNextPage && <div>마지막 게시글입니다.</div>}
    </>
  );
};

export default PostListPage;
