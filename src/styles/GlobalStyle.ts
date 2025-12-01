// src/styles/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* CSS 리셋 및 기본 폰트 설정 */
  body {
    margin: 0;
    padding: 0;
    font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
    background-color: #f8f9fa;
    color: #212529;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
