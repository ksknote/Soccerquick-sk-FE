import React from 'react';
import styled from 'styled-components';
import MainSearch from '../components/search/MainSearch';
import { BodyWrapper } from '../styles/styled-components/CommonStyle';
import Carousel from '../components/main/Carousel';
import Header from '../components/Header';
import HeaderCategory from '../components/common/HeaderCategory';
import Footer from '../components/Footer';
import { Wrapper } from '../styles/styled-components/CommonStyle';
import NewTeamPosts from '../components/main/NewTeamPosts';
import HotCommunityPosts from '../components/main/HotCommunityPosts';

export default function Main() {
  return (
    <>
      <Header />
      <HeaderCategory />
      <Carousel />
      <Wrapper>
        <MainBodyWrapper>
          <MainSearch />
          <HotCommunityPosts />
          <NewTeamPosts />
        </MainBodyWrapper>
      </Wrapper>
      <Footer />
    </>
  );
}

const MainBodyWrapper = styled(BodyWrapper)`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
