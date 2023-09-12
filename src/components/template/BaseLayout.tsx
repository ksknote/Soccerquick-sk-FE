import React from 'react';
import styled from 'styled-components';
import Header from '../Header';
import HeaderCategory from '../common/HeaderCategory';
import Footer from '../Footer';
import { Wrapper } from '../../styles/styled-components/CommonStyle';

interface BaseLayoutProps {
  children: React.ReactNode;
}

function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <>
      <Header />
      <HeaderCategory />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </>
  );
}

export default BaseLayout;
