import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Wrapper } from '../../styles/styled-components/CommonStyle';

interface MyPageLayoutProps {
  children: React.ReactNode;
}

function MyPageLayout({ children }: MyPageLayoutProps) {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </>
  );
}

export default MyPageLayout;
