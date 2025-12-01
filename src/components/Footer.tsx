// src/components/Kkoritmal.tsx
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  text-align: center;
  padding: 2rem 0;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  margin-top: auto;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2025. DEV BLOG. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
