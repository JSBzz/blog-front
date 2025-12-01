import { PostInfo } from '../types';

export let mockPosts: PostInfo[] = [
  {
    id: 1,
    title: 'React와 TypeScript로 만드는 블로그',
    summary: '타입스크립트를 사용하면 안정적인 리액트 애플리케이션을 만들 수 있습니다. 기본 설정부터 알아봅니다.',
    date: '2025년 12월 1일',
    content: '타입스크립트를 사용하면 안정적인 리액트 애플리케이션을 만들 수 있습니다. 기본 설정부터 알아봅니다. (여기는 전체 내용입니다.)',
    tags: ['React', 'TypeScript', '블로그'],
    comments: [],
  },
  {
    id: 2,
    title: 'styled-components 완전 정복',
    summary: 'CSS-in-JS 라이브러리인 styled-components의 장점과 사용법에 대해 깊이 있게 다룹니다.',
    date: '2025년 11월 28일',
    content: 'CSS-in-JS 라이브러리인 styled-components의 장점과 사용법에 대해 깊이 있게 다룹니다. (여기는 전체 내용입니다.)',
    tags: ['styled-components', 'CSS-in-JS', '스타일링'],
    comments: [],
  },
  {
    id: 3,
    title: '한글 명명 규칙의 장단점',
    summary: '코드 가독성을 높이기 위한 방법으로 한글 변수명과 함수명을 사용하는 것에 대한 고찰입니다.',
    date: '2025년 11月 25日',
    content: '코드 가독성을 높이기 위한 방법으로 한글 변수명과 함수명을 사용하는 것에 대한 고찰입니다. (여기는 전체 내용입니다.)',
    tags: ['한글', '명명규칙', '클린코드'],
    comments: [],
  },
];
