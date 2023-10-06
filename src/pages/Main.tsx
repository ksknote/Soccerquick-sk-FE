import styled from 'styled-components';
import MainSearch from '../components/search/MainSearch';
import { BodyWrapper } from '../styles/styled-components/CommonStyle';
import Carousel from '../components/main/Carousel';
import Header from '../components/common/Header';
import MobileHeader from '../components/main/MobileHeader';
import HeaderCategory from '../components/common/HeaderCategory';
import Footer from '../components/common/Footer';
import { Wrapper } from '../styles/styled-components/CommonStyle';
import HotFields from '../components/main/HotFields';
import NewTeamPosts from '../components/main/NewTeamPosts';
import HotCommunityPosts from '../components/main/HotCommunityPosts';
import FieldListByRegion from '../components/main/FieldListByRegion';

export default function Main() {
  return (
    <>
      <MobileHeader />
      <Header />
      <HeaderCategory />
      <Carousel />
      <Wrapper>
        <MainBodyWrapper>
          <MainSearch />
          <FieldListByRegion />
          <HotFields />
          <NewTeamPosts />
          <HotCommunityPosts />
        </MainBodyWrapper>
      </Wrapper>
      <Footer />
    </>
  );
}

const MainBodyWrapper = styled(BodyWrapper)`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;
