import React from 'react';
import styled from 'styled-components';
import Header from '../common/Header';
import HeaderCategory from '../common/HeaderCategory';
import Footer from '../common/Footer';
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
