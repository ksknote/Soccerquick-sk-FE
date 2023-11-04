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
      <MainBodyWrapper>
        <div>
          <MainSearch />
          <FieldListByRegion />
        </div>
        <HotFields />
        <NewTeamPosts />
        <HotCommunityPosts />
      </MainBodyWrapper>
      <Footer />
    </>
  );
}

const MainBodyWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  @media (min-width: 768px) {
    padding: 1rem 2rem 7rem 2rem;
    gap: 5rem;
  }
`;
